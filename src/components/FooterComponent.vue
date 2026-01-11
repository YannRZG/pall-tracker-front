<template>
  <footer
    class="flex justify-around items-center px-8 py-4 my-4 mx-5 mt-auto"
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
    <div class="mx-auto max-w-7xl px-6 text-center text-sm text-indigo-600">
      © {{ new Date().getFullYear() }} Pall Tracker — Tous droits réservés
    </div>
    <router-link
      to="/contact"
      class="text-indigo-600 hover:bg-gray-700/70 transition-colors px-4 py-2 rounded-lg font-medium"
    >
      Contact
    </router-link>
  </footer>
</template>
