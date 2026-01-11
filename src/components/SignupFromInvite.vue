<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from '@/plugins/axios' // ou axios direct

  const route = useRoute()
  const router = useRouter()

  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const form = ref({
    password: '',
    password_confirmation: ''
  })

  onMounted(() => {
    token.value = route.query.token
    if (!token.value) {
      error.value = "Lien d'invitation invalide"
    }
  })

  const submit = async () => {
    error.value = null
    loading.value = true

    try {
      await axios.post('/signup_from_invite', {
        token: token.value,
        password: form.value.password,
        password_confirmation: form.value.password_confirmation
      })

      router.push('/login') // ou dashboard
    } catch (err) {
      error.value = err.response?.data?.error || 'Erreur lors de l’inscription'
    } finally {
      loading.value = false
    }
  }
  </script>

  <template>
    <div class="signup-container">
      <h1>Créer votre compte</h1>

      <p v-if="error" class="error">{{ error }}</p>

      <form v-if="token" @submit.prevent="submit">
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            v-model="form.password"
            required
          />
        </div>

        <div>
          <label>Confirmation du mot de passe</label>
          <input
            type="password"
            v-model="form.password_confirmation"
            required
          />
        </div>

        <button :disabled="loading">
          {{ loading ? 'Création...' : 'Créer mon compte' }}
        </button>
      </form>
    </div>
  </template>

  <style scoped>
  .signup-container {
    max-width: 400px;
    margin: 80px auto;
  }
  .error {
    color: red;
    margin-bottom: 1rem;
  }
  </style>
