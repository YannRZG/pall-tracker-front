<template>
  <span
    v-if="value > 0"
    class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700"
  >
    {{ value }}
  </span>
  <span
    v-else
    class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-500"
  >
    0
  </span>
</template>

<script setup>
defineProps({
  value: Number
})
</script>

