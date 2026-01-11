<template>
  <transition name="fade">
    <div
      v-if="toast.visible"
      class="fixed bottom-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white font-medium z-50"
      :class="toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'"
    >
      {{ toast.message }}
    </div>
  </transition>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
const { toast } = storeToRefs(uiStore)
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
