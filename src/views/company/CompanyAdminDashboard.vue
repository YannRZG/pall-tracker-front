<template>
  <AppLoader v-if="store.loading" />

  <div v-else class="space-y-6">
    <CompanyHeader :company="store.company" />
    <CompanyStats v-if="store.stats" :stats="store.stats" />
    <CompanyUsersTable :users="store.users" />
    <InviteUserModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCompanyAdminStore } from '@/stores/companyAdmin'
import { useUserStore } from '@/stores/user'

import CompanyHeader from '@/components/company/CompanyHeader.vue'
import CompanyStats from '@/components/company/CompanyStats.vue'
import CompanyUsersTable from '@/components/company/CompanyUsersTable.vue'
import InviteUserModal from '@/components/company/InviteUserModal.vue'
import AppLoader from '@/components/ui/AppLoader.vue'

const store = useCompanyAdminStore()
const userStore = useUserStore()

onMounted(() => {
  store.fetchDashboard(userStore.user.company_id)
})
</script>
