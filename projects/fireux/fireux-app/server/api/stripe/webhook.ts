import { defineEventHandler, readRawBody, setResponseStatus } from 'h3'
import Stripe from 'stripe'

export default defineEventHandler(async event => {
  const stripeSecret = useRuntimeConfig().stripeSecretKey
  const webhookSecret = useRuntimeConfig().stripeWebhookSecret

  const stripe = new Stripe(stripeSecret, { apiVersion: '2025-04-30.basil' })

  let sig = event.req.headers['stripe-signature']
  if (!sig) {
    setResponseStatus(event, 400)
    return { error: 'Missing Stripe Signature' }
  }

  const rawBody = await readRawBody(event)

  let stripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody!, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed.', err)
    setResponseStatus(event, 400)
    return { error: 'Invalid Signature' }
  }

  console.log('✅ fireux-stripe webhook triggered', stripeEvent.type)

  return { received: true }
})
