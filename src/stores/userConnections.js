import { defineStore } from 'pinia'
import axios from '../axios'

export const useUserConnectionsStore = defineStore('userConnections', {
  state: () => ({
    connections: [],
  }),
  actions: {
    async fetchConnections() {
      try {
        const res = await axios.get('/users_connections')
        console.log('res fetchConnections', res)
        this.connections = res.data
      } catch (error) {
        console.error('Erreur fetchConnections', error)
      }
    },

    async createConnection(payload) {
      try {
        const res = await axios.post('/users_connections', { users_connection: payload })
        this.connections.push(res.data)
        return res.data
      } catch (error) {
        console.error('Erreur createConnection', error)
        throw error
      }
    },

    async updateConnection(id, payload) {
      try {
        const res = await axios.put(`/users_connections/${id}`, payload)
        const index = this.connections.findIndex(c => c.id === id)
        if (index !== -1) this.connections[index] = res.data
        return res.data
      } catch (error) {
        console.error('Erreur updateConnection', error)
        throw error
      }
    },

    async deleteConnection(id) {
      try {
        await axios.delete(`/users_connections/${id}`)
        this.connections = this.connections.filter(c => c.id !== id)
      } catch (error) {
        console.error('Erreur deleteConnection', error)
        throw error
      }
    },
  },
})
