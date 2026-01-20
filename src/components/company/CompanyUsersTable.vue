<template>
  <div class="w-full">
  <div class="bg-white rounded-2xl overflow-x-auto w-full shadow-lg shadow-indigo-600/20">
    <table class="w-full text-sm text-left border-collapse">
      <!-- HEADER -->
      <thead class="bg-indigo-50 text-indigo-700 uppercase text-xs tracking-wide">
        <tr>
          <th class="p-3">Email</th>
          <th class="p-3 text-center">Actions</th>
        </tr>
      </thead>

      <!-- BODY -->
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="border-t border-indigo-100 hover:bg-indigo-50/50 transition-colors"
        >
          <!-- EMAIL -->
          <td class="p-3 font-medium text-gray-900">
            {{ user.email }}
          </td>

          <!-- ACTIONS -->
          <td class="p-3 flex justify-center">
            <button
              @click="removeUser(user.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
            >
              Supprimer
            </button>
          </td>
        </tr>

        <!-- EMPTY STATE -->
        <tr v-if="users.length === 0">
          <td colspan="2" class="p-4 text-center text-gray-400 italic">
            Aucun utilisateur dans cette entreprise
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script setup>
import { useCompanyAdminStore } from '@/stores/companyAdmin'

defineProps({
  users: {
    type: Array,
    required: true
  }
})

const store = useCompanyAdminStore()

const removeUser = (id) => store.deleteUser(id)
</script>
