<template>
  <div class="flex justify-center items-center m-2">
  <button
    @click="$emit('open')"
    class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded"
  >
    Ajouter un transport
  </button>
</div>
</template>

<script setup>
// Simple bouton qui émet un événement "open"
</script>
