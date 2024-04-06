<script setup>
import ProductSlider from '@/components/home/ProductSlider.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeOffers from '@/components/home/HomeOffers.vue'
</script>

<template>
  <div class="container mx-auto px-4">
    <HomeHero />
    <ProductSlider title="Smart Phones" category="smartphones" />
    <ProductSlider title="Laptops" category="laptops" />
    <ProductSlider title="Furniture" category="furniture" />
    <ProductSlider title="Lighting" category="lighting" />
    <HomeOffers />
  </div>
</template>
