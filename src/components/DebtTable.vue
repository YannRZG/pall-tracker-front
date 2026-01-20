<template>
  <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-600/10 overflow-x-auto">
    <table class="w-full text-sm">
      <thead class="bg-indigo-50 text-indigo-700 uppercase text-xs tracking-wide">
        <tr>
          <th class="p-3 text-left">Entreprise</th>
          <th class="p-3 text-center">Dette chargement</th>
          <th class="p-3 text-center">Dette livraison</th>
          <th class="p-3 text-center">Dette totale</th>
          <th class="p-3 text-center">Transports</th>
          <th class="p-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="company in companies"
          :key="company.id"
          class="border-t border-indigo-100 hover:bg-indigo-50/60 transition-colors cursor-pointer"
        >
          <td class="p-3">{{ company.name }}</td>

          <td class="p-3 text-center">
            <DebtBadge :value="company.loading_debt" />
          </td>

          <td class="p-3 text-center">
            <DebtBadge :value="company.delivery_debt" />
          </td>

          <td class="p-3 text-center">
            <DebtBadge :value="company.total_debt" />
          </td>

          <td class="p-3 text-center">{{ company.transports_count }}</td>

          <td class="p-3 text-center">
            <button
              @click="$emit('go-to-company', company.id)"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition"
            >
              Voir détails
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!companies.length" class="text-center text-gray-400 italic p-6">
      Aucune entreprise à afficher.
    </div>
  </div>
</template>

<script setup>
import DebtBadge from '@/components/DebtBadge.vue'

const props = defineProps({
  companies: { type: Array, required: true }
})
</script>
