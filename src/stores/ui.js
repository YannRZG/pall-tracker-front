import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUiStore = defineStore('ui', () => {
  // Loader global
  const loadingCount = ref(0)
  const isLoading = computed(() => loadingCount.value > 0)

  function startLoading() {
    loadingCount.value++
  }

  function stopLoading() {
    if (loadingCount.value > 0) loadingCount.value--
  }

  function resetLoading() {
    loadingCount.value = 0
  }

  // Toast global
  const toast = ref({
    message: '',
    type: 'success',
    visible: false
  })

  function showToast(message, type = 'success') {
    toast.value = { message, type, visible: true }
    setTimeout(() => {
      toast.value.visible = false
    }, 3000)
  }

  return {
    loadingCount,
    isLoading,
    startLoading,
    stopLoading,
    resetLoading,
    toast,
    showToast
  }
})
