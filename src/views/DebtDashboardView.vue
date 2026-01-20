<template>
  <div class="mx-auto p-6 w-full max-h-[80%]">
    <div class="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-8">
      <h1 class="text-3xl font-extrabold text-indigo-600">Dette des entreprises</h1>

      <!-- DETTES DU CARRIER -->
      <div v-if="owedByMe.length" class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-700">Ce que vous devez</h2>
        <DebtTable :companies="owedByMe" @go-to-company="goToCompanyDashboard" />
      </div>

      <!-- DETTES À RECEVOIR -->
      <div v-if="owedToMe.length" class="space-y-4">
        <h2 class="text-xl font-semibold text-gray-700">Ce qui vous est dû</h2>
        <DebtTable :companies="owedToMe" @go-to-company="goToCompanyDashboard" />
      </div>

      <!-- Aucune dette -->
      <div
        v-if="!owedByMe.length && !owedToMe.length"
        class="text-gray-500 text-center py-8 border-t border-gray-100"
      >
        Aucune dette à afficher.
      </div>
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
    console.log('data', data)
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
