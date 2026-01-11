<template>
  <div class="grid grid-cols-4 gap-4">
    <StatCard title="Transports" :value="stats?.transports_count" />
    <StatCard title="Dette chargement" :value="stats?.loading_debt" />
    <StatCard title="Dette livraison" :value="stats?.delivery_debt" />
    <StatCard title="Dette totale" :value="stats?.total_debt" />
  </div>
</template>

<script setup>
import StatCard from '@/components/ui/StatsCard.vue'
defineProps({ stats: Object })
</script>
