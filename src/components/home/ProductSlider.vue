<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { computed, onBeforeMount, ref } from 'vue'
import { ax } from '@/axios.config'
import { useRouter } from 'vue-router'
const { category, title } = defineProps({ category: String, title: String })

const link = computed(() => `/products/category/${category}`)
let products = ref(null)
let isLoading = ref(false)

const breakpoints = {
  1279: {
    itemsToShow: 4
  },
  1024: {
    itemsToShow: 3
  },
  769: {
    itemsToShow: 2
  },
  700: {
    itemsToShow: 1.5
  }
}

onBeforeMount(async () => {
  try {
    isLoading.value = true
    const res = await ax.get(link.value)
    products.value = res.data.products
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.log(error)
  }
})

const router = useRouter()

function navToProduct(id) {
  router.push({ name: 'product', params: { id: id } })
}
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="mb-16">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-xl">{{ title }}</h2>
        <router-link
          class="duration-300 hover:text-blue-500"
          :to="{ name: 'products', params: { page: 1, category: category } }"
        >
          See More
        </router-link>
      </div>
      <div v-if="isLoading" class="w-full h-[200px] flex justify-center items-center border">
        Loading...
      </div>
      <Carousel
        v-else
        snapAlign="start"
        :itemsToShow="1"
        :breakpoints="breakpoints"
        :wrap-around="true"
      >
        <Slide v-for="item in products" :key="item.id" @click="navToProduct(item.id)">
          <div class="h-[230px] w-full cursor-pointer rounded-lg overflow-hidden shadow">
            <div class="flex items-center justify-center w-full overflow-hidden max-h-[160px]">
              <img class="w-full" :src="item.thumbnail" />
            </div>
            <div class="flex justify-between p-8 px-4">
              <p>{{ item.title }}</p>
              <p>{{ item.price }} $</p>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>
.carousel__slide {
  padding: 8px;
}
.carousel__prev,
.carousel__next {
  color: white;
}
</style>
