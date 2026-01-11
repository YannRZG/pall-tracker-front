<template>
  <div class="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <div class="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold mb-6 text-center">Inscription</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">

        <!-- Prénom -->
        <div>
          <label for="first_name" class="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            id="first_name"
            v-model="first_name"
            required
            class="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <!-- Nom -->
        <div>
          <label for="last_name" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            id="last_name"
            v-model="last_name"
            required
            class="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            autocomplete="email"
            class="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <!-- Mot de passe -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            autocomplete="new-password"
            class="mt-1 p-2 w-full border rounded-lg"
          />
        </div>

        <!-- Role -->
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
          <select id="role" v-model="role" required class="mt-1 p-2 w-full border rounded-lg">
            <option value="0">Shipper</option>
            <option value="1">Carrier</option>
            <option value="2">Recipient</option>
            <option value="3">Admin</option>
          </select>
        </div>


        <!-- Erreur -->
        <p v-if="userStore.error" class="text-red-500 text-sm">{{ userStore.error }}</p>

        <!-- Bouton -->
        <button
          type="submit"
          :disabled="userStore.loading"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          <span v-if="userStore.loading">Inscription...</span>
          <span v-else>S'inscrire</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import api from '@/axios'

const email = ref('')
const password = ref('')
const first_name = ref('')
const last_name = ref('')
const role = ref(0)
const companies = ref([])

const router = useRouter()
const userStore = useUserStore()

// Charger la liste des entreprises pour le select
onMounted(async () => {
  try {
    const { data } = await api.get('/companies')
    companies.value = data.companies || []
    if (companies.value.length) company_id.value = companies.value[0].id
  } catch (err) {
    console.error('Impossible de récupérer les entreprises', err)
  }
})

const handleRegister = async () => {
  await userStore.register({
    user: {
      email: email.value,
      password: password.value,
      first_name: first_name.value,
      last_name: last_name.value,
      role: role.value,
    }
  })

  if (userStore.user) {
    router.push('/dashboard')
  }
}
</script>
