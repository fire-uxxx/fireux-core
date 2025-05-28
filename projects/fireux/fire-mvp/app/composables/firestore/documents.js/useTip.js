import { ref } from 'vue'
import { useCurrentUser } from 'vuefire'

export function useTip() {
  const currentUser = useCurrentUser()
  const { createDoc } = useDocOperations()
  const errorInfo = ref('')

  async function tipUser() {
    if (!currentUser.value) {
      errorInfo.value = 'You need to be logged in to send a tip!'
      alert(errorInfo.value)
      return
    }
    try {
      console.log('🔄 Sending request to create Stripe checkout session...')
      const response = await $fetch('/api/create-stripe-checkout', {
        method: 'POST',
        body: {
          userId: currentUser.value.uid,
          collection: 'ledger',
          product: 'Tip Donation',
          amount: 100 // 100 cents = $1.00
        }
      })
      console.log('ℹ️ Stripe session response:', response)

      if (response?.url) {
        console.log('✅ Redirecting to Stripe checkout...')
        window.location.href = response.url
      } else {
        errorInfo.value = 'Failed to create checkout session.'
        console.error('❌ Stripe session creation failed:', response)
        alert(errorInfo.value)
      }
    } catch (error) {
      errorInfo.value = 'Something went wrong, please try again!'
      console.error('❌ Error sending tip:', error)
      alert(errorInfo.value)
    }
  }

  async function recordTip(sessionId) {
    if (!currentUser.value) {
      console.error('❌ No authenticated user found for recording tip.')
      return
    }

    try {
      await createDoc('ledger', {
        userId: currentUser.value.uid,
        product: 'Tip Donation',
        amount: 100, // 100 cents = $1.00
        sessionId,
        timestamp: new Date().toISOString(),
        status: 'paid',
        currency: 'usd'
      })
      console.log(`✅ Tip recorded in ledger with session ID: ${sessionId}`)
    } catch (error) {
      console.error('❌ Failed to record tip in Firestore:', error)
    }
  }

  return {
    tipUser,
    recordTip,
    errorInfo
  }
}
