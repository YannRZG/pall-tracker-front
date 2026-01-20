<template>
  <div class="flex flex-col items-center bg-white rounded-2xl shadow-xl gap-8 p-6 mx-auto">
    <!-- HEADER -->
    <div class="w-full">
      <h2 class="text-2xl font-extrabold text-indigo-600 text-left">Gestion des connexions</h2>
    </div>

    <!-- FORMULAIRE -->
    <div class="bg-white p-6 rounded-2xl w-full shadow-lg shadow-indigo-600/20">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Ajouter une connexion</h3>
      <form @submit.prevent="createNewConnection" class="flex flex-col md:flex-row gap-4 items-center">
        <input type="email" v-model="newConnection.email" placeholder="Email de l'utilisateur" required
          class="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <select v-model="newConnection.role" required
          class="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option disabled value="">Choisir un rôle</option>
          <option v-for="r in possibleRoles" :key="r" :value="r">{{ r }}</option>
        </select>
        <button type="submit" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Envoyer
        </button>
      </form>
    </div>

    <!-- TABLEAU -->
    <div class="bg-white rounded-2xl overflow-x-auto w-full shadow-lg shadow-indigo-600/20">
      <table class="w-full text-sm text-left border-collapse">
        <thead class="bg-indigo-50 text-indigo-700 uppercase text-xs tracking-wide">
          <tr>
            <th class="p-3">ID</th>
            <th class="p-3">Entreprise</th>
            <th class="p-3">Statut de la demande</th>
            <th class="p-3">Rôle</th>
            <th class="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in connectionsStore.connections" :key="c.id"
            class="border-t border-indigo-100 hover:bg-indigo-50/50 transition-colors">
            <td class="p-3">{{ c.id }}</td>

            <!-- On affiche l'autre société -->
            <td class="p-3">{{ getOtherCompany(c) }}</td>

            <!-- Statut de la demande -->
            <td class="p-3 text-xs italic text-gray-500">
              <span v-if="c.requester.id === userStore.user.company_id">
                Demande envoyée
              </span>
              <span v-else>
                Demande reçue
              </span>
            </td>

            <td class="p-3">{{ c.role?.name }}</td>

            <td class="p-3 flex flex-col md:flex-row gap-2 justify-center items-center">
              <!-- Actions : uniquement si je suis le receiver et statut pending -->
              <template v-if="c.status === 'pending' && c.receiver.id === userStore.user.company_id">
                <select @change="updateConnectionStatus(c, $event.target.value)"
                  class="px-2 py-1 border rounded text-sm">
                  <option disabled selected>Action</option>
                  <option value="accepted">Accepter</option>
                  <option value="rejected">Refuser</option>
                </select>
              </template>

              <!-- Bouton Supprimer -->
              <button @click="deleteConnection(c)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm">
                Supprimer
              </button>
            </td>
          </tr>

          <tr v-if="connectionsStore.connections.length === 0">
            <td colspan="5" class="p-4 text-center text-gray-400 italic">Aucune connexion disponible</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUserConnectionsStore } from '../stores/userConnections'
import { useUiStore } from '../stores/ui'
import { useUserStore } from '../stores/user'

const connectionsStore = useUserConnectionsStore()
const userStore = useUserStore()
const uiStore = useUiStore()
const newConnection = ref({ email: '', role: '' })
const possibleRoles = ['shipper', 'carrier']

// 🔹 Renvoie l'autre société (requester ou receiver)
const getOtherCompany = (connection) => {
  if (!userStore.user) return '—'

  return connection.requester.id === userStore.user.company_id
    ? connection.receiver.name
    : connection.requester.name
}

const fetchConnections = async () => {
  try { await connectionsStore.fetchConnections() }
  catch (err) { console.error(err) }
}

const createNewConnection = async () => {
  try {
    const res = await connectionsStore.createConnection({ ...newConnection.value })
    uiStore.showToast(res.id ? 'Demande envoyée ✅' : res.message || 'Invitation envoyée', res.id ? 'success' : 'info')
    newConnection.value = { email: '', role: '' }
  } catch (err) {
    console.error(err)
    uiStore.showToast('Impossible d’envoyer ❌', 'error')
  }
}

const updateConnectionStatus = async (connection, status) => {
  if (!status) return
  try {
    const res = await connectionsStore.updateConnection(connection.id, { status })
    Object.assign(connection, res)
  } catch (err) { console.error( "Erreur lors de la modification du statut", err)
    uiStore.showToast('Impossible de modifier le statut ❌', 'error')
   }
}

const deleteConnection = async (connection) => {
  try { await connectionsStore.deleteConnection(connection.id) }
  catch (err) { console.error(err) }
}

onMounted(fetchConnections)
</script>
