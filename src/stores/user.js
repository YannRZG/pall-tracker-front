// userStore.js
import { defineStore } from 'pinia'
import api from '../axios'
import { useUiStore } from '@/stores/ui' // ✅ Import du store UI pour les toasts

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    // 🔹 Récupérer l'utilisateur connecté
    async fetchUser() {
      const uiStore = useUiStore() // 🔹 initialise le store pour les toasts
      this.loading = true
      try {
        const res = await api.get('/current_user') // ou '/profile'
        const u = res.data.data?.user || res.data.user

        if (u) {
          this.user = {
            id: u.id,
            email: u.email,
            role: u.role,
            admin: u.admin,
            super_admin: u.super_admin,
            company_id: u.company_id,
            company: u.company || null,
            first_name: u.first_name || '',
            last_name: u.last_name || '',
          }
        } else {
          this.user = null
        }

        this.error = null
        console.log('Utilisateur récupéré :', this.user)
      } catch (err) {
        this.user = null
        this.error = 'Impossible de récupérer l’utilisateur'
        console.error('Utilisateur non authentifié', err)
        uiStore.showToast(this.error, 'error') // 🔹 affichage toast erreur
      } finally {
        this.loading = false
      }
    },

    // 🔹 Inscription
    async register(credentials) {
      const uiStore = useUiStore()
      this.loading = true
      try {
        const res = await api.post('/users', credentials)
        const token = res.data.data?.token
        if (token) localStorage.setItem('token', token)

        await this.fetchUser()
        this.error = null
        uiStore.showToast('Inscription réussie ✅', 'success') // 🔹 toast succès
      } catch (err) {
        this.user = null
        this.error = 'Email ou mot de passe incorrect'
        console.error('Erreur lors de l’inscription', err)
        uiStore.showToast(this.error, 'error') // 🔹 toast erreur
      } finally {
        this.loading = false
      }
    },

    // 🔹 Connexion
    async login(email, password) {
      const uiStore = useUiStore()
      this.loading = true

      try {
        const res = await api.post('/login', {
          user: {
            email,
            password,
          },
        })

        const token = res.data.data?.token
        if (token) localStorage.setItem('token', token)

        await this.fetchUser()
        this.error = null
        uiStore.showToast('Connexion réussie ✅', 'success')
      } catch (err) {
        this.user = null
        this.error = 'Email ou mot de passe incorrect'
        console.error('Erreur lors de la connexion', err)
        uiStore.showToast(this.error, 'error')
        throw err
      } finally {
        this.loading = false
      }
    },

    // 🔹 Déconnexion
    async logout() {
      const uiStore = useUiStore()

      try {
        await api.delete('/logout') // ✅ rien d’autre
        this.user = null
        uiStore.showToast('Déconnexion réussie ✅', 'success')
      } catch (err) {
        console.error('Erreur déconnexion', err)
        uiStore.showToast('Erreur lors de la déconnexion', 'error')
      }
    }


  },

  persist: true,
})
