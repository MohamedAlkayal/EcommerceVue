<script setup>
import SpinnerSvg from '@/components/shared/SpinnerSvg.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ax } from '@/axios.config'

const route = useRoute()
const router = useRouter()

const pageName = computed(() => {
  const slug = route.params.category
  if (isNaN(slug)) {
    const words = slug?.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    return words.join(' ')
  } else return 'Somthing went wrong'
})

const isLoading = ref(false)
const products = ref(null)
const totalPageCount = ref(null)
const currentPage = computed(() => route.params.page || 1)
const skippedCount = computed(() => (currentPage.value - 1) * pageProductsCount)
const pageProductsCount = 20

function prevPage() {
  if (currentPage.value > 1) {
    router.push({
      name: 'products',
      params: { page: currentPage.value - 1, category: route.params.category }
    })
  }
}
function nextPage() {
  if (currentPage.value < totalPageCount.value) {
    router.push({
      name: 'products',
      params: { page: +currentPage.value + 1, category: route.params.category }
    })
  }
}

onMounted(loadData)
// this is an alternative way to re render on page change
// watch(() => route.params.page, loadData)

async function loadData() {
  try {
    isLoading.value = true
    if (route.params.category && route.params.category !== 'all-products') {
      const res = await ax.get(`/products/category/${route.params.category}`)
      products.value = res.data.products
      totalPageCount.value = Math.ceil(res.data.total / pageProductsCount)
      isLoading.value = false
      return
    }
    const res = await ax.get(`/products?limit=${pageProductsCount}&skip=${skippedCount.value}`)
    products.value = res.data.products
    totalPageCount.value = Math.ceil(res.data.total / pageProductsCount)

    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
}
</script>

<template>
  <div class="container mx-auto mb-24">
    <div
      class="flex flex-col gap-4 mx-4 sm:flex-row items-center justify-between p-4 px-8 rounded-xl bg-gray-100 mb-12"
    >
      <h1 class="text-3xl font-medium text-gray-600">{{ pageName }}</h1>
      <div class="flex justify-center items-center gap-8">
        <button
          class="duration-300 hover:text-blue-500"
          @click="prevPage"
          :class="currentPage == 1 ? ' text-gray-400 hover:text-gray-400' : ''"
          :disabled="currentPage == 1"
        >
          &lt; Back
        </button>
        <p>Page {{ currentPage }} of {{ totalPageCount }}</p>
        <button
          class="duration-300 hover:text-blue-500"
          @click="nextPage"
          :class="currentPage == totalPageCount ? ' text-gray-400 hover:text-gray-400' : ''"
          :disabled="currentPage == totalPageCount"
        >
          Next &gt;
        </button>
      </div>
    </div>
    <div
      class="mx-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center"
      v-if="products && !isLoading"
    >
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div v-else-if="isLoading" class="flex justify-center">
      <SpinnerSvg classes=" h-16 w-16 fill-blue-500 text-gray-300" />
    </div>
    <div v-else class="text-center text-gray-500">No products found</div>
  </div>
</template>
