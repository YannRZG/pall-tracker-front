<template>
  <header class="p-4 space-y-4">
    <h1 class="text-3xl font-bold">{{ company?.name || 'Chargement...' }}</h1>
    <p class="text-sm"> {{ company?.role || '—' }}</p>
    <p class="text-sm">Nombre d'utilisateurs : {{ usersCount || 0 }}</p>
  </header>
</template>

<script setup>
  defineProps({
    company: Object,
    usersCount: {
      type: Number,
      default: 0
    }
  })
  </script>
