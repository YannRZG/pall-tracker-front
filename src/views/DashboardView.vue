<template>
  <div class="">
    <div class="flex justify-around items-center">
      <AddPaletteButton @open="openModal" />
    </div>
    <TableComponent :palettes="palettes" />
  </div>

  <AddPaletteModal :show="showModal" @close="closeModal" @record-added="addRecord" />
</template>

<script setup>
import { ref } from 'vue'
import TableComponent from '@/components/TableComponent.vue'
import AddPaletteButton from '@/components/buttons/AddPaletteButton.vue'
import AddPaletteModal from '@/components/AddPaletteModal.vue'

const showModal = ref(false)
const palettes = ref([]) // 👈 tu stockes ici la liste des palettes

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const addRecord = (newRecord) => {
  palettes.value.unshift(newRecord) // ou .push si tu veux l'ajouter à la fin
}
// 👇 quand on ajoute une palette depuis le modal
// const handleAddPalette = (newPalette) => {
//   palettes.value.push(newPalette)
//   closeModal()
// }
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
