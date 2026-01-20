<template>
  <div class="space-y-6 basis-2/5">
    <!-- INVITE CARD -->
    <div class="max-w-xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold text-gray-900">
          Inviter un utilisateur
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          L’utilisateur recevra un email pour créer son compte.
        </p>
      </div>

      <!-- Form -->
      <div class="space-y-4">
        <!-- Email -->
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input v-model="email" type="email" placeholder="ex: user@entreprise.com"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex items-center justify-end gap-3">
        <button @click="cancel" class="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
          Annuler
        </button>

        <button @click="invite" :disabled="!email || loading"
          class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">
          {{ loading ? 'Envoi…' : 'Envoyer l’invitation' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCompanyAdminStore } from '@/stores/companyAdmin'
import { useUiStore } from '@/stores/ui'

const store = useCompanyAdminStore()
const uiStore = useUiStore()

const open = ref(false)
const email = ref('')
const loading = ref(false)

const cancel = () => {
  open.value = false
  email.value = ''
}

const invite = async () => {
  loading.value = true
  try {
    // On n'envoie plus de role, le backend prendra celui de la company
    await store.inviteUser({ email: email.value })

    uiStore.showToast(`Invitation envoyée à ${email.value}`, 'success')
    cancel()
  } catch (err) {
    uiStore.showToast(
      err.response?.data?.errors?.join(', ') ||
      'Erreur lors de l’invitation',
      'error'
    )
  } finally {
    loading.value = false
  }
}
</script>
