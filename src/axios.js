import axios from 'axios'
import { useUiStore } from '@/stores/ui'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

/* =========================
   REQUEST
========================= */
api.interceptors.request.use(
  config => {
    const uiStore = useUiStore()
    uiStore.startLoading()

    return config
  },
  error => {
    const uiStore = useUiStore()
    uiStore.stopLoading()
    return Promise.reject(error)
  }
)

/* =========================
   RESPONSE
========================= */
api.interceptors.response.use(
  response => {
    const uiStore = useUiStore()
    uiStore.stopLoading()

    // Toast succès uniquement pour mutation
    if (['post', 'put', 'patch', 'delete'].includes(response.config.method)) {
      uiStore.showToast('Opération réussie', 'success')
    }

    return response
  },
  error => {
    const uiStore = useUiStore()
    uiStore.stopLoading()

    // Gestion propre des erreurs Rails API
    const message =
      error.response?.data?.error ||
      error.response?.data?.errors?.join(', ') ||
      'Une erreur est survenue'

    uiStore.showToast(message, 'error')

    return Promise.reject(error)
  }
)

export default api
