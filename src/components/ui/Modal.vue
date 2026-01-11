<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-4 rounded shadow-md">
      <slot></slot>
      <button class="mt-4 btn-secondary" @click="$emit('close')">Fermer</button>
    </div>
  </div>
</template>

<script setup>
</script>
