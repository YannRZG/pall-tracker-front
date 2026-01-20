<template>
  <div class="p-6 space-y-8">
    <h1 class="text-3xl font-bold text-gray-900">Super Admin</h1>
    <p class="text-gray-500">Gestion du SaaS Pall Tracker</p>

    <Tabs :tabs="tabs">
      <!-- Statistiques -->
      <template #stats>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Sociétés" :value="stats.companies" />
          <StatCard title="Utilisateurs" :value="stats.users" />
          <StatCard title="Demandes en attente" :value="stats.pending" highlight />
        </div>
      </template>

      <!-- Demandes d'inscription -->
      <template #requests>
        <div class="bg-white rounded-xl shadow-lg overflow-hidden mt-4">
          <div class="px-6 py-4 border-b">
            <h2 class="text-xl font-semibold">Demandes d'inscription</h2>
          </div>

          <table class="w-full text-sm">
            <thead class="bg-gray-50 text-gray-600">
              <tr>
                <th class="p-4 text-left">Société</th>
                <th class="p-4 text-left">Email</th>
                <th class="p-4 text-left">Message</th>
                <th class="p-4 text-left">Date</th>
                <th class="p-4 text-left">Statut</th>
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
                <td class="p-4">{{ request.admin_email }}</td>
                <td class="p-4">{{ request.message }}</td>
                <td class="p-4 text-gray-500">{{ formatDate(request.requested_at) }}</td>
                <td class="p-4">
                  <span
                    :class="{
                      'text-yellow-500': request.status === 'pending',
                      'text-green-500': request.status === 'approved',
                      'text-red-500': request.status === 'rejected',
                      'font-semibold': true
                    }"
                  >
                    {{ request.status }}
                  </span>
                </td>
                <td class="p-4 text-center space-x-2">
                  <button
                    @click="approve(request.id)"
                    :disabled="request.status !== 'pending'"
                    class="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Approuver
                  </button>
                  <button
                    @click="reject(request.id)"
                    :disabled="request.status !== 'pending'"
                    class="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Refuser
                  </button>
                </td>
              </tr>

              <tr v-if="!signupRequests.length">
                <td colspan="6" class="p-6 text-center text-gray-500">
                  Aucune demande en attente
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Tabs from '@/components/ui/Tabs.vue'
import StatCard from '@/components/ui/StatsCard.vue'
import api from '@/axios'

const stats = ref({ companies: 0, users: 0, pending: 0 })
const signupRequests = ref([])

const tabs = [
  { name: 'stats', label: 'Statistiques' },
  { name: 'requests', label: "Demandes d'inscription" }
]

const fetchDashboard = async () => {
  try {
    const { data } = await api.get('/admin/dashboard')
    stats.value = data.stats
    signupRequests.value = data.signup_requests.map(r => ({ ...r, status: 'pending' }))
  } catch (err) {
    console.error('Erreur dashboard', err)
  }
}

const setRequestStatus = (id, status) => {
  const req = signupRequests.value.find(r => r.id === id)
  if (req) req.status = status
  stats.value.pending = signupRequests.value.filter(r => r.status === 'pending').length
}

const approve = async (id) => {
  try {
    setRequestStatus(id, 'approved')
    await api.post(`/admin/signup_requests/${id}/approve`)
    setTimeout(() => {
      signupRequests.value = signupRequests.value.filter(r => r.id !== id)
    }, 1000)
  } catch (err) {
    console.error('Erreur approval', err)
    setRequestStatus(id, 'pending')
  }
}

const reject = async (id) => {
  try {
    setRequestStatus(id, 'rejected')
    await api.post(`/admin/signup_requests/${id}/reject`)
    setTimeout(() => {
      signupRequests.value = signupRequests.value.filter(r => r.id !== id)
    }, 1000)
  } catch (err) {
    console.error('Erreur rejet', err)
    setRequestStatus(id, 'pending')
  }
}

const formatDate = (date) => new Date(date).toLocaleDateString('fr-FR')

onMounted(fetchDashboard)
</script>
