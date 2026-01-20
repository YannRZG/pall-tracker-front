<!-- src/layouts/AdminLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-indigo-700 text-white px-6 py-4 flex justify-between">
      <h1 class="font-bold">Pall Tracker — Admin</h1>
      <span>Super Admin</span>
    </nav>

    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>
