<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Créer un compte</h1>

    <input
      v-model="form.email"
      type="email"
      placeholder="Email"
      class="w-full input mb-4"
      :readonly="!!token"
    />

    <input
      v-model="form.first_name"
      placeholder="Prénom"
      class="w-full input mb-4"
    />

    <input
      v-model="form.last_name"
      placeholder="Nom"
      class="w-full input mb-4"
    />

    <input
      v-model="form.password"
      type="password"
      placeholder="Mot de passe"
      class="w-full input mb-4"
    />

    <input
      v-model="form.password_confirmation"
      type="password"
      placeholder="Confirmation"
      class="w-full input mb-4"
    />

    <button
      @click="signup"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
    >
      Créer mon compte
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/axios'
import { useUserStore } from '@/stores/user'
import { useUiStore } from '@/stores/ui'

const form = ref({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: ''
})

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const uiStore = useUiStore()

const token = ref(null)

onMounted(() => {
  if (route.query.token) {
    token.value = route.query.token
    form.value.email = route.query.email || '' // optionnel si tu veux pré-remplir
  }
})

const signup = async () => {
  try {
    const payload = { user: form.value, token: token.value }
    const { data } = await api.post('/signup_from_invite', payload)

    // connecter l’utilisateur directement après inscription
    userStore.user = data.user
    userStore.token = data.token

    uiStore.showToast('Compte créé avec succès ✅', 'success')
    router.push('/') // ou page dashboard
  } catch (err) {
    uiStore.showToast(
      err.response?.data?.errors?.join(', ') || 'Erreur lors de l’inscription',
      'error'
    )
  }
}
</script>
