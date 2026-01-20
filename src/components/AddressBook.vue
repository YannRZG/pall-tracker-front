<template>
  <div class="bg-white border border-gray-200 rounded-2xl shadow-xl p-8 space-y-8 max-h-[80%]">
    <h1 class="text-3xl font-bold text-indigo-600">Carnet d'adresses</h1>
    <p class="text-gray-500">
      Cette page vous permet de gérer vos adresses de livraison et de livraison.
    </p>

    <div v-if="connections.length"
      class="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-600/10 overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-indigo-50 text-indigo-700 text-left uppercase text-xs tracking-wider">
          <tr>
            <th class="p-4">Shipper</th>
            <th class="p-4">Carrier</th>
            <th class="p-4">Rôle</th>
            <th class="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="connection in connections" :key="connection.id"
            class="border-t border-indigo-100 hover:bg-indigo-50/60 transition-colors">
            <!-- Requester -->
            <td class="p-4">
              <div class="font-medium text-gray-900">{{ connection.requester.name }}</div>
              <div class="text-sm text-gray-500">{{ connection.requester.email || '' }}</div>
            </td>

            <!-- Receiver -->
            <td class="p-4">
              <div class="font-medium text-gray-900">{{ connection.receiver.name }}</div>
              <div class="text-sm text-gray-500">{{ connection.receiver.email || '' }}</div>
            </td>

            <!-- Role -->
            <td class="p-4">
              <div class="font-medium text-gray-900">{{ connection.role.name }}</div>
            </td>

            <td class="p-4 text-center">
              <button @click="viewConnection(connection)"
                class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition">
                Voir détails
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <div v-else class="text-gray-400 text-center mt-8 italic">
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
