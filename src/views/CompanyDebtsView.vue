<template>
  <div class="p-6 space-y-6">
    <!-- Titre -->
    <h1 class="text-2xl font-bold">
      {{ company.name }}
    </h1>

    <!-- KPIs -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <KpiCard title="Dette chargement" :value="stats.loading_debt" color="red" />
      <KpiCard title="Dette livraison" :value="stats.delivery_debt" color="red" />
      <KpiCard title="Dette totale" :value="stats.total_debt" color="red" />
      <KpiCard title="Transports" :value="stats.transports_count" color="blue" />
    </div>

    <!-- Tableau -->
    <div class="bg-white shadow rounded-lg overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-100 text-gray-600 text-left">
          <tr>
            <th class="p-2">Date</th>
            <th>Transport</th>
            <th>Chargement</th>
            <th>Dette charg.</th>
            <th>Livraison</th>
            <th>Dette livr.</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in records"
            :key="record.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="p-2">{{ formatDate(record.date) }}</td>
            <td>{{ record.transport }}</td>
            <td>{{ record.loading_point }}</td>

            <td>
              <DebtBadge :value="record.loading_debt" />
            </td>

            <td>{{ record.delivery_point }}</td>

            <td>
              <DebtBadge :value="record.delivery_debt" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import api from '@/axios'

  import KpiCard from '@/components/KpiCard.vue'
  import DebtBadge from '@/components/DebtBadge.vue'

  const route = useRoute()

  const company = ref({})
  const stats = ref({})
  const records = ref([])

  const fetchDashboard = async () => {
    const { data } = await api.get(`/companies/${route.params.id}/dashboard`)
    console.log('Dashboard API response:', data)
    company.value = data.company
    stats.value = data.stats
    records.value = data.records
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('fr-FR')

  onMounted(fetchDashboard)
  </script>
