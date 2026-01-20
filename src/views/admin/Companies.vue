<template>
  <div class="space-y-4">
    <h1 class="text-2xl font-bold">Entreprises</h1>

    <table class="w-full bg-white rounded-xl shadow">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-3 text-left">Nom</th>
          <th class="p-3">Email</th>
          <th class="p-3">Statut</th>
          <th class="p-3 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="company in companies" :key="company.id" class="border-t">
          <td class="p-3 font-medium">{{ company.name }}</td>
          <td class="p-3">{{ company.email }}</td>
          <td class="p-3">
            <span
              :class="company.approved ? 'badge green' : 'badge orange'"
            >
              {{ company.approved ? 'Validée' : 'En attente' }}
            </span>
          </td>
          <td class="p-3 text-right">
            <button
              v-if="!company.approved"
              @click="approve(company.id)"
              class="btn green"
            >
              Valider
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/axios'

const companies = ref([])

const approve = async (id) => {
  await api.post(`/admin/companies/${id}/approve`)
  companies.value.find(c => c.id === id).approved = true
}

onMounted(async () => {
  const res = await api.get('/admin/companies')
  companies.value = res.data
})
</script>
