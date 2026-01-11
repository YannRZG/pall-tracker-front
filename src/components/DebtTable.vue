<template>
  <table class="w-full text-sm bg-white shadow rounded-lg overflow-hidden">
    <thead class="bg-gray-100 text-gray-600">
      <tr>
        <th class="p-2 text-left">Entreprise</th>
        <th class="p-2 text-center">Dette chargement</th>
        <th class="p-2 text-center">Dette livraison</th>
        <th class="p-2 text-center">Dette totale</th>
        <th class="p-2 text-center">Transports</th>
        <th class="p-2 text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="company in companies"
        :key="company.id"
        class="border-t hover:bg-gray-50 cursor-pointer"
      >
        <td class="p-2">{{ company.name }}</td>
        <td class="p-2 text-center">
          <DebtBadge :value="company.loading_debt" />
        </td>
        <td class="p-2 text-center">
          <DebtBadge :value="company.delivery_debt" />
        </td>
        <td class="p-2 text-center">
          <DebtBadge :value="company.total_debt" />
        </td>
        <td class="p-2 text-center">{{ company.transports_count }}</td>
        <td class="p-2 text-center">
          <button
            @click="$emit('go-to-company', company.id)"
            class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Voir détails
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import DebtBadge from '@/components/DebtBadge.vue'
const props = defineProps({
  companies: { type: Array, required: true }
})
</script>
