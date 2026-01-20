<template>
  <div class="w-full h-full mx-auto p-6 space-y-8">
    <Tabs :tabs="tabs">
      <!-- Onglet Informations -->
      <template #info>
        <div class="flex flex-col gap-8 mx-auto">

          <!-- INFORMATIONS PERSONNELLES -->
          <div class="bg-white p-6 rounded-2xl shadow-lg shadow-indigo-600/20 space-y-6">
            <h2 class="text-2xl font-extrabold text-indigo-600">Informations personnelles</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-gray-600 font-medium">Prénom</label>
                <input v-model="form.first_name" placeholder="Votre prénom"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div class="space-y-2">
                <label class="block text-gray-600 font-medium">Nom</label>
                <input v-model="form.last_name" placeholder="Votre nom"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div class="space-y-2">
                <label class="block text-gray-600 font-medium">Email</label>
                <input v-model="form.email" type="email" placeholder="exemple@company.com"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div class="space-y-2">
                <label class="block text-gray-600 font-medium">Téléphone</label>
                <input v-model="form.phone" placeholder="+33 6 12 34 56 78"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div class="md:col-span-2 space-y-2">
                <label class="block text-gray-600 font-medium">Entreprise</label>
                <input :value="company.name" disabled
                  class="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg cursor-not-allowed" />
              </div>
            </div>

            <!-- SÉCURITÉ -->
            <div class="space-y-6">
              <h3 class="text-xl font-semibold text-gray-800">Sécurité</h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label class="block text-gray-600 font-medium">Nouveau mot de passe</label>
                  <input v-model="password.password" type="password"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div class="space-y-2">
                  <label class="block text-gray-600 font-medium">Confirmation</label>
                  <input v-model="password.password_confirmation" type="password"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div class="flex justify-end pt-2">
                <button @click="updatePassword"
                  class="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                  Modifier le mot de passe
                </button>
              </div>
            </div>
          </div>

          <!-- INFORMATIONS ENTREPRISE (ADMIN UNIQUEMENT) -->
          <div v-if="isAdmin" class="bg-indigo-50 p-6 rounded-2xl border border-indigo-200 space-y-4">
            <h3 class="text-xl font-semibold text-indigo-700">
              Informations de l’entreprise
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="space-y-2">
                <label class="block text-gray-600 font-medium">Rue</label>
                <input v-model="companyForm.street" placeholder="12 rue de Paris"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div class="space-y-2">
                <label class="block text-gray-600 font-medium">Code postal</label>
                <input v-model="companyForm.zipcode" placeholder="75001"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div class="space-y-2">
                <label class="block text-gray-600 font-medium">Pays</label>
                <input v-model="companyForm.country" placeholder="France"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>

          <!-- BOUTON SAVE -->
          <div class="flex justify-end pt-2">
            <button
              @click="updateProfile"
              :disabled="isUpdatingPassword"
              class="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg
                     hover:bg-indigo-700 transition
                     disabled:opacity-50 disabled:cursor-not-allowed">
              Enregistrer les informations
            </button>
          </div>

        </div>
      </template>

      <!-- Onglet Administration -->
      <template #admin>
        <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-xl space-y-6">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-extrabold text-indigo-600">Administration de l’entreprise</h2>
            <span class="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
              Admin
            </span>
          </div>

          <div class="space-y-6">
            <CompanyHeader :company="companyAdminStore.company" :users-count="companyAdminStore.users.length" />
            <CompanyStats v-if="companyAdminStore.stats" :stats="companyAdminStore.stats" />
            <div class="flex flex-row justify-around gap-6 py-6 mx-auto">
              <CompanyUsersTable :users="companyAdminStore.users" />
              <InviteUserModal />
            </div>
          </div>
        </div>
      </template>

      <!-- Onglet Connections -->
      <template #connections>
        <UserConnectionsManager />
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
import UserConnectionsManager from '@/components/UserConnectionsManager.vue'

const userStore = useUserStore()
const uiStore = useUiStore()
const companyAdminStore = useCompanyAdminStore()

const isAdmin = computed(() => userStore.user?.admin === true)

const isUpdatingPassword = computed(() => {
  return !!password.value.password || !!password.value.password_confirmation
})

const tabs = computed(() => {
  const baseTabs = [
    { name: 'info', label: 'Informations' },
    { name: 'connections', label: 'Connexions' },
  ]
  if (isAdmin.value) baseTabs.unshift({ name: 'admin', label: 'Administration' })
  return baseTabs
})

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
})

const password = ref({
  password: '',
  password_confirmation: '',
})

const company = ref({})

const companyForm = ref({
  street: '',
  zipcode: '',
  country: '',
})

const fetchProfile = async () => {
  try {
    userStore.loading = true
    const { data } = await api.get('/profile')

    Object.assign(form.value, data.user)
    company.value = data.company || {}

    if (isAdmin.value && data.company) {
      Object.assign(companyForm.value, {
        street: data.company.street,
        zipcode: data.company.zipcode,
        country: data.company.country,
      })
      await companyAdminStore.fetchDashboard(userStore.user.company_id)
    }
  } catch {
    uiStore.showToast('Impossible de charger le profil', 'error')
  } finally {
    userStore.loading = false
  }
}

const updateProfile = async () => {
  try {
    userStore.loading = true

    await api.put('/profile', {
      user: form.value,
      company: isAdmin.value ? companyForm.value : undefined,
    })

    Object.assign(userStore.user, form.value)

    if (isAdmin.value) {
      Object.assign(company.value, companyForm.value)
    }

    uiStore.showToast('Profil mis à jour avec succès ✅', 'success')
  } catch (err) {
    uiStore.showToast(err.response?.data?.errors?.join(', ') || 'Erreur lors de la mise à jour', 'error')
  } finally {
    userStore.loading = false
  }
}

const updatePassword = async () => {
  if (!password.value.password) return

  try {
    userStore.loading = true
    await api.put('/profile/password', { user: password.value })
    password.value.password = ''
    password.value.password_confirmation = ''
    uiStore.showToast('Mot de passe mis à jour 🔒', 'success')
  } catch {
    uiStore.showToast('Erreur lors de la mise à jour du mot de passe', 'error')
  } finally {
    userStore.loading = false
  }
}

onMounted(fetchProfile)
</script>
