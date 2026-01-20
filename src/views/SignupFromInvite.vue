<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md bg-white rounded-xl shadow-sm border p-8">
      <!-- Title -->
      <h1 class="text-2xl font-semibold text-gray-900 mb-2">Créer votre compte</h1>
      <p class="text-sm text-gray-500 mb-6">
        Finalisez votre inscription pour rejoindre votre entreprise.
      </p>

      <!-- Error -->
      <div
        v-if="error"
        class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700"
      >
        {{ error }}
      </div>

      <!-- Form -->
      <form v-if="token" @submit.prevent="submit" class="space-y-4">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            type="text"
            v-model="form.last_name"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Prénom</label>
          <input
            type="text"
            v-model="form.first_name"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input
            type="password"
            v-model="form.password"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Confirmation du mot de passe</label
          >
          <input
            type="password"
            v-model="form.password_confirmation"
            required
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          <span v-if="!loading">Créer mon compte</span>
          <span v-else>Création en cours…</span>
        </button>
      </form>

      <!-- Invalid token -->
      <div v-else class="text-sm text-gray-500 text-center mt-4">
        Lien d’invitation invalide ou expiré.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const token = ref(null)
const company = ref(null)
const email = ref(null)
const loading = ref(false)
const error = ref(null)

const form = ref({
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: '',
})

// -----------------------------
// Vérifier le token d'invitation
// -----------------------------
onMounted(async () => {
  token.value = route.query.token
  if (!token.value) {
    error.value = "Lien d'invitation invalide"
    return
  }

  try {
    const { data } = await axios.get(`/invitations/${token.value}`)
    company.value = data.invitation.company
    email.value = data.invitation.email
  } catch {
    error.value = 'Invitation invalide ou expirée'
  }
})

// -----------------------------
// Création de compte & auto login
// -----------------------------
const submit = async () => {
  loading.value = true
  error.value = null

  try {
    await axios.post('/signup_from_invite', {
      token: token.value,
      user: {
        first_name: form.value.first_name,
        last_name: form.value.last_name,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation,
      },
    })

    // 🔹 Auto login : session Rails native
    await userStore.fetchUser()

    // 🔹 Redirection selon rôle
    if (userStore.user?.super_admin) router.push({ name: 'admin-dashboard' })
    else if (userStore.user?.role === 'admin') router.push({ name: 'company-admin' })
    else router.push({ name: 'dashboard' })
  } catch (err) {
    error.value =
      err.response?.data?.error ||
      err.response?.data?.errors?.[0] ||
      'Erreur lors de la création du compte'
  } finally {
    loading.value = false
  }
}
</script>
