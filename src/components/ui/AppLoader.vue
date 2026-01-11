<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    >
      <div class="w-16 h-16 border-4 border-t-blue-600 border-gray-300 rounded-full animate-spin"></div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
const { isLoading } = storeToRefs(uiStore)
const show = computed(() => isLoading.value)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
