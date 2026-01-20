import { defineStore } from 'pinia'
import api from '@/axios'

export const useCompanyAdminStore = defineStore('companyAdmin', {
  state: () => ({
    company: null,
    stats: null,
    users: [],
    loading: false
  }),

  actions: {
    async fetchDashboard(companyId) {
      this.loading = true
      try {
        const { data } = await api.get(`/companies/${companyId}/dashboard`)
        console.log('data dashboard', data)
        this.company = data.company
        this.stats = data.stats
        this.users = data.users.filter(u => !u.deleted_at)
      } finally {
        this.loading = false
      }
    },

    async inviteUser(payload) {
      // POST vers le nouvel endpoint d’invitation
      await api.post('/company_users/invite', payload)
      // Rafraîchir le dashboard pour voir la nouvelle invitation si nécessaire
      await this.fetchDashboard(this.company.id)
    },

    async updateUser(userId, role) {
      await api.put(`/company_users/${userId}`, { role })
      await this.fetchDashboard(this.company.id)
    },

    async deleteUser(userId) {
      await api.delete(`/company_users/${userId}`)
      this.users = this.users.filter(u => u.id !== userId)
    }
  }
})
