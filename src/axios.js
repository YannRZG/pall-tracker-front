import axios from 'axios'
import { useUiStore } from '@/stores/ui'

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

/* =========================
   REQUEST
========================= */
api.interceptors.request.use(
  config => {
    const uiStore = useUiStore()
    uiStore.startLoading() // ✅ remplace setLoading(true)

    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => {
    const uiStore = useUiStore()
    uiStore.stopLoading() // ✅ remplace setLoading(false)
    return Promise.reject(error)
  }
)

/* =========================
   RESPONSE
========================= */
api.interceptors.response.use(
  response => {
    const uiStore = useUiStore()
    uiStore.stopLoading() // ✅ remplace setLoading(false)

    // Toast succès uniquement pour modification
    if (['post', 'put', 'patch', 'delete'].includes(response.config.method)) {
      uiStore.showToast('Opération réussie', 'success')
    }

    return response
  },
  error => {
    const uiStore = useUiStore()
    uiStore.stopLoading() // ✅ remplace setLoading(false)

    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.join(', ') ||
      'Une erreur est survenue'
    uiStore.showToast(message, 'error')

    return Promise.reject(error)
  }
)

export default api
