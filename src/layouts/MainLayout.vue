<script setup>
import TheHeader from '@/components/layout/TheHeader.vue'
import Thefooter from '@/components/layout/TheFooter.vue'
</script>

<template>
  <div class="min-h-dvh flex flex-col justify-between">
    <div>
      <TheHeader />
      <router-view :key="$route.path" />
    </div>
    <Thefooter />
  </div>
</template>
