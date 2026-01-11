<template>
  <div v-if="showLoader">
    <p>Chargement de l'utilisateur...</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'

const userStore = useUserStore()
const route = useRoute()

const showLoader = computed(() => {
  return !route.meta.public && userStore.loading
})

onMounted(async () => {
  if (route.meta.public) return

  const token = localStorage.getItem('token')
  if (token && !userStore.user) {
    await userStore.fetchUser()
  }
})
</script>
