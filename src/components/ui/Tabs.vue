<template>
  <div class="flex flex-col space-y-4 min-h-[70vh]">
    <!-- Onglets -->
    <div class="flex p-4">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selected = index"
        :class="[
          'px-4 py-2 -mb-px font-medium text-sm',
          selected === index
            ? 'border-b-2 border-indigo-600 text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Contenu -->
    <div class="mt-4">
      <slot :name="tabs[selected].name" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    // Chaque tab : { name: 'info', label: 'Informations' }
  },
  initial: {
    type: Number,
    default: 0,
  },
})

const selected = ref(props.initial)

watch(
  () => props.initial,
  (val) => (selected.value = val)
)
</script>
