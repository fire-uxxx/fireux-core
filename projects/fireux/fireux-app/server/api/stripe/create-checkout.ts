import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import Stripe from 'stripe'
import admin from '../../utils/firebase'

export default defineEventHandler(async event => {
  const {
    public: { domain }
  } = useRuntimeConfig()

  const stripeSecretKey = useRuntimeConfig().stripeSecretKey

  if (!stripeSecretKey) {
    console.error('Stripe Secret Key is missing in runtimeConfig.')
    setResponseStatus(event, 500)
    return { error: 'Internal Server Error: Stripe Secret Key is missing.' }
  }

  const currency = 'usd'

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-04-30.basil'
  })

  if (event.req.method !== 'POST') {
    setResponseStatus(event, 405)
    return { error: 'Method Not Allowed' }
  }

  try {
    const body = await readBody(event)
    const { userId, collection, productId, productName, amount, quantity = 1, metadata = {} } = body

    if (!userId || !collection || !productName || !amount) {
      setResponseStatus(event, 400)
      return { error: 'Missing required parameters', received: body }
    }

    const frontendUrl = domain

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: productName,
              metadata: {
                productId,
                ...metadata
              }
            },
            unit_amount: amount
          },
          quantity
        }
      ],
      mode: 'payment',
      metadata: {
        userId,
        collection,
        productId,
        productName,
        ...metadata
      },
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`
    })

    const db = admin.firestore()
    await db.collection(collection).add({
      userId,
      productId,
      productName,
      amount,
      quantity,
      sessionId: session.id,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      currency
    })

    return {
      id: session.id,
      url: session.url
    }
  } catch (error) {
    console.error('Stripe Checkout Error:', error)
    setResponseStatus(event, 500)
    return { error: error instanceof Error ? error.message : 'Unknown error' }
  }
})
