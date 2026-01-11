<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Email
          </th>

          <th
            class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Rôle
          </th>

          <th
            class="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
          >
            Actions
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-100">
        <tr
          v-for="user in users"
          :key="user.id"
          class="hover:bg-gray-50 transition"
        >
          <!-- EMAIL -->
          <td class="px-6 py-4 text-sm font-medium text-gray-900">
            {{ user.email }}
          </td>

          <!-- ROLE -->
          <td class="px-6 py-4">
            <select
              :value="user.role"
              @change="updateRole(user.id, $event.target.value)"
              class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="shipper">Shipper</option>
              <option value="carrier">Carrier</option>
              <option value="recipient">Recipient</option>
              <option value="admin">Admin</option>
            </select>
          </td>

          <!-- ACTIONS -->
          <td class="px-6 py-4 text-right">
            <button
              @click="removeUser(user.id)"
              class="text-sm font-medium text-red-600 hover:text-red-800 transition"
            >
              Supprimer
            </button>
          </td>
        </tr>

        <!-- EMPTY STATE -->
        <tr v-if="!users?.length">
          <td
            colspan="3"
            class="px-6 py-8 text-center text-sm text-gray-500"
          >
            Aucun utilisateur dans cette entreprise
          </td>
        </tr>
      </tbody>
    </table>
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

const updateRole = (id, role) => store.updateUser(id, role)
const removeUser = (id) => store.deleteUser(id)
</script>
