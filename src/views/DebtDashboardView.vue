<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Dette des entreprises</h1>

    <!-- DETTES DU CARRIER -->
    <div v-if="owedByMe.length">
      <h2 class="text-xl font-semibold mt-4">Ce que vous devez</h2>
      <DebtTable :companies="owedByMe" @go-to-company="goToCompanyDashboard" />
    </div>

    <!-- DETTES À RECEVOIR -->
    <div v-if="owedToMe.length">
      <h2 class="text-xl font-semibold mt-4">Ce qui vous est dû</h2>
      <DebtTable :companies="owedToMe" @go-to-company="goToCompanyDashboard" />
    </div>

    <div v-if="!owedByMe.length && !owedToMe.length" class="text-gray-500 text-center mt-6">
      Aucune dette à afficher.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'
import DebtTable from '@/components/DebtTable.vue'

const owedByMe = ref([])
const owedToMe = ref([])
const router = useRouter()

const fetchDebts = async () => {
  try {
    const { data } = await api.get('/debts') // DebtsController#index
    owedByMe.value = data.owed_by_me || []
    owedToMe.value = data.owed_to_me || []
  } catch (error) {
    console.error('Erreur lors de la récupération des dettes :', error)
  }
}

const goToCompanyDashboard = (companyId) => {
  router.push({ name: 'company-details', params: { id: companyId } })
}

onMounted(fetchDebts)
</script>
