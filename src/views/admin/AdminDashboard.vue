<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card">
      <p class="label">Entreprises</p>
      <p class="value">{{ stats.companies.total }}</p>
    </div>

    <div class="card">
      <p class="label">Validées</p>
      <p class="value text-green-600">{{ stats.companies.approved }}</p>
    </div>

    <div class="card">
      <p class="label">En attente</p>
      <p class="value text-orange-600">{{ stats.companies.pending }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '@/axios'

const stats = ref({
  companies: {},
  users: {}
})

onMounted(async () => {
  const res = await api.get('/admin/dashboard')
  stats.value = res.data
})
</script>

<style scoped>
.card {
  @apply bg-white rounded-xl shadow p-6;
}
.label {
  @apply text-sm text-gray-500;
}
.value {
  @apply text-3xl font-bold;
}
</style>
