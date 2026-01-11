<template>
  <div class="p-6 space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Carnet d'adresses</h1>

    <div
      v-if="connections.length"
      class="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-600/10 overflow-x-auto"
    >
      <table class="w-full text-sm">
        <thead
          class="bg-indigo-50 text-indigo-700 text-left uppercase text-xs tracking-wider"
        >
          <tr>
            <th class="p-4">Shipper</th>
            <th class="p-4">Carrier</th>
            <th class="p-4">Recipient</th>
            <th class="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="connection in connections"
            :key="connection.id"
            class="border-t border-indigo-100 hover:bg-indigo-50/60 transition-colors"
          >
            <td class="p-4">
              <div class="font-medium text-gray-900">
                {{ connection.shipper.email }}
              </div>
              <div class="text-sm text-gray-500">
                {{ connection.shipper.company.name }}
              </div>
            </td>

            <td class="p-4">
              <div class="font-medium text-gray-900">
                {{ connection.carrier.email }}
              </div>
              <div class="text-sm text-gray-500">
                {{ connection.carrier.company.name }}
              </div>
            </td>

            <td class="p-4">
              <div class="font-medium text-gray-900">
                {{ connection.recipient.email }}
              </div>
              <div class="text-sm text-gray-500">
                {{ connection.recipient.company.name }}
              </div>
            </td>

            <td class="p-4 text-center">
              <button
                @click="viewConnection(connection)"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
              >
                Voir détails
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else
      class="text-gray-400 text-center mt-8 italic"
    >
      Aucune connexion disponible.
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import api from '@/axios'

const connections = ref([])

const fetchConnections = async () => {
  try {
    const response = await api.get('/users_connections') // Endpoint Rails
    console.log('Connexions récupérées:', response.data)
    connections.value = response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des connexions", error)
  }
}

const viewConnection = (connection) => {
  // Exemple : rediriger vers une page qui montre toutes les palettes pour cette connexion
  console.log('Voir détails de la connexion:', connection)
  // router.push(`/connections/${connection.id}`) si tu veux créer une page dédiée
}

onMounted(fetchConnections)
</script>
