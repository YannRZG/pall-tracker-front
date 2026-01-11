<template>
  <RouterLink
    :to="to"
    class="rounded-lg px-4 py-2 text-sm font-medium
           text-gray-700 hover:bg-gray-100 hover:text-indigo-600
           transition"
    active-class="bg-indigo-50 text-indigo-600"
  >
    <slot />
  </RouterLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>
