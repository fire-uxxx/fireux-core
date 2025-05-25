import { defineEventHandler, readBody, setResponseStatus } from 'h3'
import Stripe from 'stripe'
import admin from '../../utils/firebase'

export default defineEventHandler(async event => {
  const stripeSecretKey = useRuntimeConfig().stripeSecretKey

  if (!stripeSecretKey) {
    setResponseStatus(event, 500)
    return { success: false, error: 'Missing Stripe Secret Key' }
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-04-30.basil'
  })

  if (event.node.req.method !== 'POST') {
    setResponseStatus(event, 405)
    return { success: false, error: 'Method Not Allowed' }
  }

  try {
    const body = await readBody(event)
    const { product } = body

    if (!product?.name || !product?.prices?.[0]) {
      setResponseStatus(event, 400)
      return {
        success: false,
        error: 'Missing product name or prices array',
        received: body
      }
    }

    const images = product.image ? [product.image] : []

    // 1. Create Stripe product
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      active: product.active,
      images
    })

    const firstPrice = product.prices[0]

    // 2. Create Stripe price
    await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: firstPrice.unit_amount,
      currency: firstPrice.currency,
      billing_scheme: firstPrice.billing_scheme,
      recurring:
        firstPrice.type === 'recurring'
          ? {
              interval: firstPrice.interval ?? 'month',
              interval_count: firstPrice.intervalCount ?? 1
            }
          : undefined
    })

    // 3. Wait for Firestore document to exist
    const firestore = admin.firestore()
    const docRef = firestore.doc(`products/${stripeProduct.id}`)

    const maxWaitMs = 5000
    const pollIntervalMs = 100
    const startTime = Date.now()

    while (true) {
      const docSnap = await docRef.get()
      if (docSnap.exists) break

      if (Date.now() - startTime > maxWaitMs) {
        setResponseStatus(event, 504)
        return {
          success: false,
          error: 'Timeout: Firestore document not created in time.'
        }
      }

      await new Promise(resolve => setTimeout(resolve, pollIntervalMs))
    }

    // 4. Return success
    return {
      success: true,
      id: stripeProduct.id,
      message: 'Product, price, and Firestore sync completed.'
    }
  } catch (error) {
    console.error('Stripe Product Creation Error:', error)
    setResponseStatus(event, 500)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
})
