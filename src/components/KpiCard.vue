<template>
  <div class="p-4 bg-white shadow rounded-lg">
    <p class="text-sm text-gray-500">{{ title }}</p>
    <p
      class="text-2xl font-bold"
      :class="color === 'red' ? 'text-red-600' : 'text-blue-600'"
    >
      {{ value }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: Number,
  color: String
})
</script>
