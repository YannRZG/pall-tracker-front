<template>
  <div
    class="rounded-xl p-6 shadow-lg bg-white border-l-4"
    :class="highlight ? 'border-blue-600' : 'border-gray-200'"
  >
    <p class="text-gray-500 text-sm">{{ title }}</p>
    <p class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [Number, String],
  highlight: Boolean,
})
</script>
