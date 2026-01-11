<template>
  <div class="p-6 space-y-8">
    <!-- Title -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900">Super Admin</h1>
      <p class="text-gray-500">Gestion du SaaS Pall Tracker</p>
    </div>

    <!-- KPI -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Sociétés" :value="stats.companies" />
      <StatCard title="Utilisateurs" :value="stats.users" />
      <StatCard title="Demandes en attente" :value="stats.pending" highlight />
    </div>

    <!-- Signup Requests -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="px-6 py-4 border-b">
        <h2 class="text-xl font-semibold">Demandes d'inscription</h2>
      </div>

      <table class="w-full text-sm">
        <thead class="bg-gray-50 text-gray-600">
          <tr>
            <th class="p-4 text-left">Société</th>
            <th class="p-4 text-left">Email</th>
            <th class="p-4 text-left">Rôle</th>
            <th class="p-4 text-left">Date</th>
            <th class="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="request in signupRequests"
            :key="request.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="p-4 font-medium">{{ request.company_name }}</td>
            <td class="p-4">{{ request.email }}</td>
            <td class="p-4 capitalize">{{ request.role }}</td>
            <td class="p-4 text-gray-500">
              {{ formatDate(request.created_at) }}
            </td>
            <td class="p-4 text-center space-x-2">
              <button
                @click="approve(request.id)"
                class="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                Approuver
              </button>
              <button
                @click="reject(request.id)"
                class="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Refuser
              </button>
            </td>
          </tr>

          <tr v-if="!signupRequests.length">
            <td colspan="5" class="p-6 text-center text-gray-500">
              Aucune demande en attente
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/axios'
import StatCard from '@/components/ui/StatsCard.vue'

const stats = ref({
  companies: 0,
  users: 0,
  pending: 0,
})

const signupRequests = ref([])

const fetchDashboard = async () => {
  const { data } = await api.get('/admin/dashboard')
  stats.value = data.stats
  signupRequests.value = data.signup_requests
}

const approve = async (id) => {
  await api.post(`/admin/signup_requests/${id}/approve`)
  fetchDashboard()
}

const reject = async (id) => {
  await api.post(`/admin/signup_requests/${id}/reject`)
  fetchDashboard()
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString('fr-FR')

onMounted(fetchDashboard)
</script>
