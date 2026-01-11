<template>
  <div>
    <!-- Onglets -->
    <div class="flex border-b border-gray-200">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selected = index"
        :class="[
          'px-4 py-2 -mb-px font-medium text-sm',
          selected === index
            ? 'border-b-2 border-blue-600 text-blue-600'
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
