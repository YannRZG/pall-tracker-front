<template>
  <div
    class="rounded-xl p-6 shadow-lg shadow-indigo-600/20 bg-white border-l-4 border-indigo-600"

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
