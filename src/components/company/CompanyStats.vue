<template>
  <div class="grid grid-cols-4 gap-6 pb-4">
    <StatCard title="Transports" :value="stats?.transports_count || 0" />
    <StatCard title="Dette chargement" :value="stats?.loading_debt || 0" />
    <StatCard title="Dette livraison" :value="stats?.delivery_debt || 0" />
    <StatCard title="Dette totale" :value="stats?.total_debt || 0" />
  </div>
</template>

<script setup>
import StatCard from '@/components/ui/StatsCard.vue'

defineProps({
  stats: {
    type: Object,
    default: () => ({
      transports_count: 0,
      loading_debt: 0,
      delivery_debt: 0,
      total_debt: 0
    })
  }
})
</script>
