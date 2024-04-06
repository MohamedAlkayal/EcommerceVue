<script setup>
import ProductSlider from '@/components/home/ProductSlider.vue'
import { ax } from '@/axios.config'
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const route = useRoute()
const product = ref(null)
const isLoading = ref(false)

const user = computed(() => store.state.user)
const isAlreadyInStore = computed(() => {
  return store.state.cart.some((item) => item.id === product.value.id)
})

onMounted(async () => {
  try {
    isLoading.value = true
    const res = await ax.get(`/products/${route.params.id}`)
    product.value = res.data
    document.title = `${product.value.title} - Market`
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
})
</script>

<template>
  <div class="container mx-auto">
    <div v-if="product" class="flex flex-col md:flex-row gap-8 mb-24">
      <div class="border rounded-2xl overflow-hidden h-[400px]">
        <img :src="product.thumbnail" class="h-full w-full object-cover" />
      </div>
      <div class="flex flex-col justify-between p-4 gap-4 w-full md:w-1/2">
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between w-full">
            <h2 class="text-2xl font-bold">{{ product.title }}</h2>
            <p>{{ product.price }} $</p>
          </div>
          <p class="text-lg">Rating {{ product.description }} /5</p>
          <p>Discount: {{ product.discountPercentage }} %</p>
          <p>Category:{{ product.category }}</p>
          <p>Brand: {{ product.brand }}</p>
        </div>
        <div class="flex gap-4">
          <div class="w-full" v-if="user">
            <button
              v-if="isAlreadyInStore"
              @click="store.commit('DELETE_FROM_CART', { product })"
              class="w-full h-full p-1 bg-gray-500 text-white rounded duration-300 hover:bg-gray-600"
            >
              Remove
            </button>
            <button
              v-else
              @click="store.commit('ADD_TO_CART', { product })"
              class="w-full h-full p-1 bg-green-600 text-white rounded duration-300 hover:bg-green-700"
            >
              Add to cart
            </button>
          </div>
          <button class="w-full p-2 bg-blue-500 text-white rounded duration-300 hover:bg-blue-600">
            Order Now
          </button>
        </div>
      </div>
    </div>
    <ProductSlider v-if="product" title="Based on this" :category="product.category" />
  </div>
</template>
