<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-10 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl relative">
      <button
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✖
      </button>
      <h3 class="text-xl font-semibold mb-4">Ajouter une nouvelle palette</h3>
      <form @submit.prevent="handleSubmit" class="grid grid-cols-2 gap-4">
        <!-- Semaine -->
        <div>
          <label class="block text-gray-600 mb-1">Semaine</label>
          <input v-model="form.week" class="w-full border rounded px-3 py-2" readonly />
        </div>
        <!-- Date -->
        <div>
          <label class="block text-gray-600 mb-1">Date</label>
          <input v-model="form.date" type="date" class="w-full border rounded px-3 py-2" />
        </div>
        <!-- Transport -->
        <div>
          <label class="block text-gray-600 mb-1">Transport</label>
          <input v-model="form.transport" class="w-full border rounded px-3 py-2" />
        </div>
        <!-- Chargement (dropdown shipper) -->
        <div>
          <label class="block text-gray-600 mb-1">Chargement</label>
          <select v-model="form.loading_point" class="w-full border rounded px-3 py-2">
            <option value="" disabled>Choisir le shipper</option>
            <option v-for="shipper in shippers" :key="shipper.id" :value="shipper.id">
              {{ shipper.email }} ({{ shipper.company.name }})
            </option>
          </select>
        </div>
        <!-- Carrier (dropdown) -->
        <div>
          <label class="block text-gray-600 mb-1">Transporteur</label>
          <select v-model="form.carrier_id" class="w-full border rounded px-3 py-2">
            <option value="" disabled>Choisir le carrier</option>
            <option v-for="carrier in carriers" :key="carrier.id" :value="carrier.id">
              {{ carrier.email }} ({{ carrier.company.name }})
            </option>
          </select>
        </div>

        <!-- Livraison (dropdown recipient) -->
        <div>
          <label class="block text-gray-600 mb-1">Livraison</label>
          <select v-model="form.delivery_point" class="w-full border rounded px-3 py-2">
            <option value="" disabled>Choisir le recipient</option>
            <option v-for="recipient in recipients" :key="recipient.id" :value="recipient.id">
              {{ recipient.email }} ({{ recipient.company.name }})
            </option>
          </select>
        </div>
        <!-- Chargées -->
        <div>
          <label class="block text-gray-600 mb-1">Chargées</label>
          <input
            v-model.number="form.loaded"
            type="number"
            class="w-full border rounded px-3 py-2"
          />
        </div>
        <!-- Rendues -->
        <div>
          <label class="block text-gray-600 mb-1">Rendues</label>
          <input
            v-model.number="form.rendered"
            type="number"
            class="w-full border rounded px-3 py-2"
          />
        </div>
        <!-- Dette -->
        <div>
          <label class="block text-gray-600 mb-1">Dette</label>
          <input
            v-model="form.due"
            type="number"
            class="w-full border rounded px-3 py-2"
            readonly
          />
        </div>
        <!-- Commentaire -->
        <div class="col-span-2">
          <label class="block text-gray-600 mb-1">Commentaire</label>
          <input v-model="form.comment" class="w-full border rounded px-3 py-2" />
        </div>

        <!-- Bouton enregistrer -->
        <div class="col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/axios'

const props = defineProps({ show: Boolean })
const emit = defineEmits(['close', 'record-added'])

const form = ref({
  week: '',
  date: '',
  transport: '',
  loading_point: '',
  carrier_id: '',
  delivery_point: '',
  loaded: 0,
  rendered: 0,
  due: 0,
  comment: '',
})

const shippers = ref([])
const recipients = ref([])
const carriers = ref([])

// Récupérer les connexions de l'utilisateur connecté
const fetchConnections = async () => {
  try {
    const response = await api.get('/users_connections')
    console.log('Connexions reçues :', response.data)

    // Shipppers et recipients comme avant
    shippers.value = [...new Map(response.data.map((c) => [c.shipper.id, c.shipper])).values()]
    recipients.value = [
      ...new Map(response.data.map((c) => [c.recipient.id, c.recipient])).values(),
    ]

    // Carriers → tous les carriers connectés aux shippers de l'utilisateur
    carriers.value = [...new Map(response.data.map((c) => [c.carrier.id, c.carrier])).values()]
  } catch (error) {
    console.error('Erreur lors de la récupération des connexions', error)
  }
}

const handleSubmit = async () => {
  try {
    const payload = {
      ...form.value,
      shipper_id: form.value.loading_point,
      carrier_id: form.value.carrier_id,
      recipient_id: form.value.delivery_point,
    }
    const response = await api.post('/palette_records', payload)
    emit('record-added', response.data)
    resetForm()
    emit('close')
  } catch (error) {
    console.error("Erreur lors de l'ajout de la palette", error)
  }
}

const resetForm = () => {
  form.value = {
    week: '',
    date: '',
    transport: '',
    loading_point: '',
    delivery_point: '',
    loaded: 0,
    rendered: 0,
    due: 0,
    comment: '',
  }
}

const getWeekNumber = (dateString) => {
  const date = new Date(dateString)
  const target = new Date(date.valueOf())
  const dayNr = (date.getDay() + 6) % 7
  target.setDate(target.getDate() - dayNr + 3)
  const firstThursday = new Date(target.getFullYear(), 0, 4)
  const diff = target - firstThursday
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000))
}

// Watch pour mettre à jour "week" selon la date
watch(
  () => form.value.date,
  (newDate) => {
    form.value.week = newDate ? getWeekNumber(newDate) : ''
  },
)

// Watch pour calculer la "dette" automatiquement
watch([() => form.value.loaded, () => form.value.rendered], ([loaded, rendered]) => {
  form.value.due = (loaded || 0) - (rendered || 0)
})

// Charger les connexions à l'ouverture du modal
watch(
  () => props.show,
  (val) => {
    if (val) {
      resetForm()
      fetchConnections()
    }
  },
)

onMounted(() => {
  if (props.show) {
    resetForm()
    fetchConnections()
  }
})
</script>
