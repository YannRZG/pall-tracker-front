<template>
  <div class="flex items-center justify-center min-h-[80vh]">
    <div
      class="w-full max-w-md bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl ring-1 ring-black/5"
    >
      <!-- HEADER -->
      <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-6">
        Connexion
      </h2>

      <!-- FORM -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- EMAIL -->
        <div>
          <label class="block text-gray-700 mb-2" for="email">Email</label>
          <input
            v-model="email"
            id="email"
            type="email"
            required
            autocomplete="email"
            placeholder="ex: user@entreprise.com"
            class="w-full rounded-lg border border-gray-300 px-4 py-2
                   text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500 transition"
          />
        </div>

        <!-- PASSWORD -->
        <div>
          <label class="block text-gray-700 mb-2" for="password">Mot de passe</label>
          <input
            v-model="password"
            id="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            class="w-full rounded-lg border border-gray-300 px-4 py-2
                   text-gray-900 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500 transition"
          />
        </div>

        <!-- BUTTON -->
        <button
          type="submit"
          :disabled="userStore.loading"
          class="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold
                 shadow-sm hover:bg-indigo-700 transition disabled:opacity-50"
        >
          <span v-if="userStore.loading">Connexion...</span>
          <span v-else>Se connecter</span>
        </button>
      </form>

      <!-- FOOTER -->
      <div class="text-center mt-6 text-sm text-gray-600">
        Pas encore de compte ?
        <router-link
          to="/register"
          class="text-indigo-600 hover:underline font-medium"
        >
          Inscrivez-vous
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email = ref('')
const password = ref('')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = async () => {
  try {
    await userStore.login({
      user: {
        email: email.value,
        password: password.value,
      },
    })

    if (userStore.user) {
      router.push('/dashboard')
    }
  } catch (err) {
    console.error(err)
    // 👀 tu peux aussi ajouter un toast ici
  }
}
</script>
