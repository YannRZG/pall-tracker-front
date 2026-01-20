<template>
  <nav
    class="sticky top-4 z-50 mx-5 flex items-center justify-between
           bg-gray-50 backdrop-blur-md rounded-2xl shadow-lg shadow-indigo-600/20 border border-indigo-200
           px-8 py-4"
  >
    <!-- LOGO -->
    <div class="flex items-center gap-3">
      <RouterLink
        to="/"
        class="text-3xl font-extrabold tracking-tight text-indigo-600 hover:text-indigo-700"
      >
        Pall<span class="text-gray-900">Tracker</span>
      </RouterLink>
    </div>

    <!-- NAV LINKS (auth) -->
    <div class="hidden md:flex items-center gap-2" v-if="userStore.user">
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/debts">Dettes</NavLink>
      <NavLink to="/address-book">Carnet d’adresses</NavLink>
    </div>

    <!-- RIGHT SIDE -->
    <div class="flex items-center gap-4">
      <!-- ================= AUTH ================= -->
      <template v-if="userStore.user">
        <!-- USER INFO -->
        <div class="hidden sm:flex flex-col items-end leading-tight">
          <RouterLink
            to="/profile"
            class="text-sm font-semibold text-gray-900 hover:text-indigo-600 w-14"
          >
            {{ userFullName }}
          </RouterLink>

          <RouterLink
            to="/profile"
            v-if="userStore.user?.company"
            class="text-xs text-gray-500"
          >
            {{ userStore.user.company.name }}
          </RouterLink>
        </div>

        <!-- LOGOUT -->
        <button
          @click="logout"
          class="inline-flex items-center justify-center rounded-lg
                 bg-red-500 px-3 py-2 text-sm font-medium text-white
                 hover:bg-red-600 transition shadow-sm"
        >
          Déconnexion
        </button>
      </template>

      <!-- ================= GUEST ================= -->
      <template v-else>
        <RouterLink
          to="/login"
          class="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2
                 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Connexion
        </RouterLink>
      </template>
    </div>
  </nav>
</template>


<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import NavLink from '@/components/navbar/Navlink.vue'

const router = useRouter()
const userStore = useUserStore()
const isAdmin = computed(() => userStore.user?.role === 'admin')


// 🔒 SAFE computed
const userFullName = computed(() => {
  if (!userStore.user) return ''
  return `${userStore.user.first_name || ''} ${userStore.user.last_name || ''}`.trim()
})

// Déconnexion
const logout = async () => {
  try {
    await userStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error)
  }
}
</script>
