<template>
  <div class="flex flex-col min-h-screen">
    <header class="p-4">
      <Navbar />
    </header>

    <main class="relative flex flex-col justify-center items-center flex-1 p-4">
      <CheckAuth />
      <RouterView />

      <!-- Loader GLOBAL -->
      <AppLoader :show="uiStore.isLoading" />

      <!-- Toast global -->
      <AppToast />
    </main>

    <footer class="p-4">
      <FooterComponent />
    </footer>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

import CheckAuth from '@/components/CheckAuth.vue'
import Navbar from '@/components/navbar/NavBar.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import AppToast from '@/components/ui/AppToast.vue'

import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()
</script>
