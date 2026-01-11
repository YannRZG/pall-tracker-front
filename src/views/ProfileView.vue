<template>
  <div class="max-w-6xl mx-auto p-6 space-y-8">
    <!-- <p class="text-gray-500 mt-1">
      Gérez vos informations personnelles et la sécurité de votre compte
    </p> -->

    <Tabs :tabs="tabs">
      <!-- Onglet Informations -->
      <template #info>
        <div class="bg-white shadow-md rounded-xl p-6 space-y-6">
          <h2 class="text-xl font-semibold text-gray-700">Informations personnelles</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-600 mb-1">Prénom</label>
              <input v-model="form.first_name" class="w-full input" placeholder="Prénom" />
            </div>

            <div>
              <label class="block text-gray-600 mb-1">Nom</label>
              <input v-model="form.last_name" class="w-full input" placeholder="Nom" />
            </div>

            <div>
              <label class="block text-gray-600 mb-1">Email</label>
              <input v-model="form.email" type="email" class="w-full input" placeholder="Email" />
            </div>

            <div>
              <label class="block text-gray-600 mb-1">Téléphone</label>
              <input v-model="form.phone" class="w-full input" placeholder="Téléphone" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-gray-600 mb-1">Entreprise</label>
              <input
                :value="company.name"
                disabled
                class="w-full input bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          <div class="flex justify-end">
            <button
              @click="updateProfile"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </template>

      <!-- Onglet Sécurité -->
      <template #security>
        <div class="bg-white shadow-md rounded-xl p-6 space-y-6">
          <h2 class="text-xl font-semibold text-gray-700">Sécurité</h2>

          <div>
            <label class="block text-gray-600 mb-1">Nouveau mot de passe</label>
            <input
              v-model="password.password"
              type="password"
              class="w-full input focus:ring-yellow-400"
              placeholder="Nouveau mot de passe"
            />
          </div>

          <div>
            <label class="block text-gray-600 mb-1">Confirmation</label>
            <input
              v-model="password.password_confirmation"
              type="password"
              class="w-full input focus:ring-yellow-400"
              placeholder="Confirmation"
            />
          </div>

          <button
            @click="updatePassword"
            class="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Modifier le mot de passe
          </button>
        </div>
      </template>

      <!-- Onglet Administration (uniquement pour admin) -->
      <template #admin v-if="isAdmin">
        <div class="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-800">Administration de l’entreprise</h2>
            <span class="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
              Admin
            </span>
          </div>

          <CompanyHeader :company="companyAdminStore.company" />
          <CompanyStats v-if="companyAdminStore.stats" :stats="companyAdminStore.stats" />
          <CompanyUsersTable :users="companyAdminStore.users" />
          <InviteUserModal />
        </div>
      </template>
    </Tabs>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/axios'
import { useUserStore } from '@/stores/user'
import { useUiStore } from '@/stores/ui'
import { useCompanyAdminStore } from '@/stores/companyAdmin'

import Tabs from '@/components/ui/Tabs.vue'
import CompanyHeader from '@/components/company/CompanyHeader.vue'
import CompanyStats from '@/components/company/CompanyStats.vue'
import CompanyUsersTable from '@/components/company/CompanyUsersTable.vue'
import InviteUserModal from '@/components/company/InviteUserModal.vue'

const userStore = useUserStore()
const uiStore = useUiStore()
const companyAdminStore = useCompanyAdminStore()

const isAdmin = computed(() => userStore.user?.role === 'admin')

const tabs = [
  { name: 'info', label: 'Informations' },
  { name: 'security', label: 'Sécurité' },
  { name: 'admin', label: 'Administration' }
]

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: ''
})

const password = ref({
  password: '',
  password_confirmation: ''
})

const company = ref({})

/* Charger le profil */
const fetchProfile = async () => {
  try {
    userStore.loading = true
    const { data } = await api.get('/profile')

    Object.assign(form.value, {
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      phone: data.user.phone
    })

    company.value = data.company || {}

    if (isAdmin.value) {
      await companyAdminStore.fetchDashboard(userStore.user.company_id)
    }
  } catch (err) {
    uiStore.showToast('Impossible de charger le profil', 'error')
  } finally {
    userStore.loading = false
  }
}

/* Update profil */
const updateProfile = async () => {
  try {
    userStore.loading = true
    await api.put('/profile', { user: form.value })

    Object.assign(userStore.user, {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email
    })

    uiStore.showToast('Profil mis à jour avec succès ✅', 'success')
  } catch (err) {
    uiStore.showToast(
      err.response?.data?.errors?.join(', ') || 'Erreur lors de la mise à jour',
      'error'
    )
  } finally {
    userStore.loading = false
  }
}

/* Update mot de passe */
const updatePassword = async () => {
  if (!password.value.password) return

  try {
    userStore.loading = true
    await api.put('/profile/password', { user: password.value })

    password.value.password = ''
    password.value.password_confirmation = ''

    uiStore.showToast('Mot de passe mis à jour 🔒', 'success')
  } catch (err) {
    uiStore.showToast(
      err.response?.data?.errors?.join(', ') || 'Erreur lors de la mise à jour du mot de passe',
      'error'
    )
  } finally {
    userStore.loading = false
  }
}

onMounted(fetchProfile)
</script>
