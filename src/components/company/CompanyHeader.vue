<template>
  <header class="p-4 bg-gray-100">
    <h1>{{ company?.name || 'Chargement...' }}</h1>
    <p>Nombre d'utilisateurs : {{ company?.users?.count || 0 }}</p>
  </header>
</template>

<script setup>
defineProps({
  company: {
    type: Object,
    default: () => null
  }
})
</script>
