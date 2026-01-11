<template>
  <div class="p-6 space-y-6">
    <!-- Top bar -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg shadow-indigo-600/10"
    >
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher..."
          class="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <p class="text-xs text-gray-400 mt-1">
          Rechercher par : semaine, date, référence…
        </p>
      </div>

      <button
        @click="downloadPdf"
        class="self-start md:self-auto inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        Exporter PDF
      </button>
    </div>

    <!-- Tableau -->
    <div
      v-if="filteredRecords.length"
      class="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-600/10 overflow-x-auto"
    >
      <!-- Pagination -->
      <div class="flex items-center justify-center gap-3 p-4 border-b">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          ◀
        </button>

        <span class="text-sm font-medium text-gray-600">
          Page {{ currentPage }} / {{ totalPages }}
        </span>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          ▶
        </button>
      </div>

      <div ref="pdfContent">
        <table class="w-full text-sm">
          <thead class="bg-indigo-50 text-indigo-700 uppercase text-xs tracking-wide">
            <tr>
              <th class="p-3">Sem.</th>
              <th class="p-3">Date</th>
              <th class="p-3">Transport</th>
              <th class="p-3">Chargement</th>
              <th class="p-3">Chargées</th>
              <th class="p-3">Rendues</th>
              <th class="p-3">Dette ch.</th>
              <th class="p-3">Transporteur</th>
              <th class="p-3">Livraison</th>
              <th class="p-3">Livrées</th>
              <th class="p-3">Reprises</th>
              <th class="p-3">Dette liv.</th>
              <th class="p-3">Commentaire</th>
              <th class="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(record, index) in paginatedRecords"
              :key="record.id"
              class="border-t hover:bg-indigo-50/50 transition"
            >
              <td class="p-3">{{ record.week }}</td>
              <td class="p-3">{{ formatDate(record.date) }}</td>
              <td class="p-3">{{ record.transport }}</td>

              <td class="p-3">
                <button
                  @click="goToCompanyDetails(record.company_id)"
                  class="text-indigo-600 hover:underline font-medium"
                >
                  {{ record.loading_point }}
                </button>
              </td>

              <td class="p-3 text-center">{{ record.loaded }}</td>
              <td class="p-3 text-center">{{ record.rendered }}</td>

              <td class="p-3 text-center">
                <span
                  :class="record.loading_debt > 0
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-500'"
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {{ record.loading_debt }}
                </span>
              </td>

              <td class="p-3">
                {{ record.carrier?.company?.name || '—' }}
              </td>

              <td class="p-3">{{ record.delivery_point }}</td>
              <td class="p-3 text-center">{{ record.delivered }}</td>
              <td class="p-3 text-center">{{ record.returned }}</td>

              <td class="p-3 text-center">
                <span
                  :class="record.delivery_debt > 0
                    ? 'bg-red-100 text-red-700'
                    : 'bg-green-100 text-green-700'"
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {{ record.delivery_debt }}
                </span>
              </td>

              <td class="p-3 text-gray-500">
                {{ record.comment || '—' }}
              </td>

              <td class="p-3 text-center">
                <button
                  v-if="editIndex !== index"
                  @click="edit(index)"
                  class="text-indigo-600 hover:underline font-medium"
                >
                  Modifier
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-else
      class="text-center text-gray-400 italic mt-10"
    >
      Aucune donnée disponible
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '../axios'
import { exportTableToPdf } from '@/utils/exportPdf'

const pdfContent = ref(null)
const router = useRouter()

const goToCompanyDetails = (companyId) => {
  router.push({
    name: 'company-details',
    params: { id: companyId },
  })
}

const downloadPdf = () => {
  console.log('Type de pdfContent.value:', typeof pdfContent.value)
  console.log('Instance de HTMLElement:', pdfContent.value instanceof HTMLElement)

  if (pdfContent.value) {
    console.log(pdfContent.value.innerHTML)
    exportTableToPdf(pdfContent.value)
  } else {
    console.warn('pdfContent non trouvé')
  }
}

const paletteRecords = ref([])
const editIndex = ref(null)
const editRecord = ref({})
const currentPage = ref(1)
const itemsPerPage = 15
const searchQuery = ref('')
const totalDebt = ref(0)

// Récupérer les données
const fetchData = async () => {
  try {
    const response = await api.get('/palette_records')
    console.log('Données reçues :', response.data)
    paletteRecords.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error)
  }
}

// Fonction pour changer de page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Calculer le nombre total de pages
const totalPages = computed(() => {
  return Math.ceil(filteredRecords.value.length / itemsPerPage)
})

function normalizeString(str) {
  return str
    ?.toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const filteredRecords = computed(() => {
  if (!searchQuery.value) return paletteRecords.value

  const query = normalizeString(searchQuery.value)

  return paletteRecords.value.filter((record) => {
    return Object.values(record).some((value) => {
      const normalized = normalizeString(value)
      return normalized?.includes(query)
    })
  })
})

// Calculer les enregistrements paginés
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredRecords.value.slice(start, end)
})

const edit = (index) => {
  editIndex.value = index
  editRecord.value = { ...paletteRecords.value[index] }
}

const save = (index) => {
  const updatedRecord = { ...editRecord.value }

  api
    .put(`/palette_records/${updatedRecord.id}`, {
      palette_record: {
        week: updatedRecord.week,
        date: updatedRecord.date,
        transport: updatedRecord.transport,
        loading_point: updatedRecord.loading_point,
        delivery_point: updatedRecord.delivery_point,
        loaded: updatedRecord.loaded,
        rendered: updatedRecord.rendered,
        comment: updatedRecord.comment,
        shipper_id: updatedRecord.shipper_id,
        recipient_id: updatedRecord.recipient_id,
      },
    })
    .then((response) => {
      paletteRecords.value[index] = response.data
      editIndex.value = null
    })
    .catch((error) => {
      console.error('Erreur lors de la mise à jour :', error)
    })
}

const cancelEdit = () => {
  editIndex.value = null
  editRecord.value = {}
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

onMounted(() => {
  fetchData()
  //fetchTotalDebt()
  console.log('Nombre de données filtrées :', filteredRecords.value.length)
})
</script>

<style scoped>
.table-component {
  padding: 1rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.search-input {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.edit-mode {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem 1rem;
}

.search-hint {
  font-size: 0.75rem;
  color: #888;
  padding-top: 0.5rem;
}

.total-label {
  font-weight: bold;
  margin: 0;
}

.total-value {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

.table-section {
  margin-top: 2rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  background: #e2e8f0;
  color: #333;
  border: none;
  font-size: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-number {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

.pdf-btn {
  margin-left: 2rem;
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  font-size: 0.75rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.pdf-btn:hover {
  background: #2563eb;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.data-table thead {
  background: #f3f4f6;
  text-align: left;
  font-size: 0.875rem;
  color: #4b5563;
}

.data-table th,
.data-table td {
  padding: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
  color: #1f2937;
}

.data-table tr:hover {
  background: #f9fafb;
}

.action-btn {
  margin-right: 0.25rem;
  font-size: 0.85rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
}

.action-btn.blue {
  color: #3b82f6;
}

.action-btn.blue:hover {
  color: #1d4ed8;
}

.action-btn.green {
  color: #10b981;
}

.action-btn.green:hover {
  color: #047857;
}

.action-btn.gray {
  color: #6b7280;
}

.action-btn.gray:hover {
  color: #374151;
}

.no-data {
  margin-top: 2rem;
  color: #4b5563;
  text-align: center;
}

/* Animation fade-in */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
