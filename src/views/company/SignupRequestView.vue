<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold mb-6 text-center">
        Demande d'inscription à Pall Tracker
      </h2>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="company_name" class="block font-medium mb-1">Nom de l'entreprise</label>
          <input
            v-model="form.company_name"
            id="company_name"
            type="text"
            required
            placeholder="Ex: Ma Super Société"
            class="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="admin_email" class="block font-medium mb-1">Email du futur admin</label>
          <input
            v-model="form.admin_email"
            id="admin_email"
            type="email"
            required
            placeholder="ex: admin@entreprise.com"
            class="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="role" class="block font-medium mb-1">Rôle du futur admin</label>
          <select
            v-model="form.role_id"
            id="role_id"
            required
            class="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option disabled value="">Sélectionnez un rôle</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="message" class="block font-medium mb-1">Message (optionnel)</label>
          <textarea
            v-model="form.message"
            id="message"
            rows="4"
            placeholder="Une note pour le super-admin"
            class="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Envoyer la demande
        </button>
      </form>

      <p v-if="successMessage" class="mt-4 text-green-600 font-medium text-center">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="mt-4 text-red-600 font-medium text-center">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/axios'

const form = ref({
  company_name: '',
  admin_email: '',
  role_id: '',
  message: ''
})
const successMessage = ref('')
const errorMessage = ref('')
const roles = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/roles') // Assure-toi d'avoir une route qui renvoie tous les rôles
    roles.value = res.data
  } catch (err) {
    console.error('Erreur récupération des rôles', err)
  }
})

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await api.post('/signup-requests', { signup_request: form.value })
    successMessage.value = 'Votre demande a été envoyée ✅'
    form.value.company_name = ''
    form.value.admin_email = ''
    form.value.role_id = ''
    form.value.message = ''
  } catch (err) {
    console.error('Erreur lors de la demande', err)
    errorMessage.value = err.response?.data?.errors?.join(', ') || 'Impossible d’envoyer la demande ❌'
  }
}
</script>
