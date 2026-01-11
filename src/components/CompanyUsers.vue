<template>
  <table class="w-full bg-white rounded shadow">
    <thead>
      <tr>
        <th>Email</th>
        <th>Rôle</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <!-- Filtrer les users soft deleted -->
      <tr v-for="user in activeUsers" :key="user.id">
        <td>{{ user.email }}</td>

        <td>
          <select
            :value="user.role"
            @change="updateRole(user.id, $event.target.value)"
          >
            <option value="shipper">Shipper</option>
            <option value="carrier">Carrier</option>
            <option value="recipient">Recipient</option>
            <option value="admin">Admin</option>
          </select>
        </td>

        <td>
          <button
            class="text-red-600"
            @click="removeUser(user.id)"
          >
            Supprimer
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useCompanyAdminStore } from '@/stores/companyAdmin'
defineProps({ users: Array })

const store = useCompanyAdminStore()

// Filtrer les utilisateurs non supprimés
const activeUsers = computed(() =>
  users.filter(u => !u.deleted_at)
)

const updateRole = (id, role) => store.updateUser(id, role)
const removeUser = (id) => store.deleteUser(id)
</script>
