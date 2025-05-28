<template>
  <UContainer v-if="currentUser" class="content-center">
    <!-- Main Logos -->
    <MainLogos />

    <header>
      <h1 class="title">Support with a Tip</h1>
    </header>

    <section class="tip-section">
      <UButton class="button" @click="tipUser">Send a Tip 💸 1 USD</UButton>
    </section>

    <section class="ledger-section">
      <h1 class="sub-title">📜 Ledger</h1>
      <UTable
        :data="formattedLedger"
        :columns="columns"
        class="ledger-table text-center"
      />
      <NoTransactionsInfo />

      <NoTransactionsLogos />
    </section>
  </UContainer>
</template>

<script setup>
const currentUser = useCurrentUser()
const { fetchCollection } = useDocs()
const { tipUser } = useTip()

const ledger = fetchCollection('ledger')

const formattedLedger = computed(() =>
  (ledger.value || []).map(entry => ({
    amount: entry.amount,
    timestamp: entry.timestamp?.seconds
      ? new Date(entry.timestamp.seconds * 1000).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit'
        })
      : 'N/A'
  }))
)

const columns = [
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'timestamp', header: 'Date' }
]
</script>

<style scoped>
.content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: var(--space-10);
  padding: var(--space-4);
  max-width: 600px;
}

.title {
  text-align: center;
  margin: var(--space-2) 0;
  font-size: var(--font-size-xl);
}

.sub-title {
  text-align: center;
  margin: var(--space-2) 0;
  font-size: var(--font-size-lg);
}
.ledger-table {
  max-width: 400px; /* Adjust width as needed */
  margin: 0 auto; /* Centers the table */
}

.ledger-table :deep(th),
.ledger-table :deep(td) {
  text-align: center;
}
</style>
