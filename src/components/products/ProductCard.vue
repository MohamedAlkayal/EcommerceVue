<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const { product } = defineProps({ product: Object })
const store = useStore()

const user = computed(() => store.state.user)
const isAlreadyInStore = computed(() => {
  return store.state.cart.some((item) => item.id === product.id)
})
</script>

<template>
  <div class="flex-shrink-0 border rounded-lg overflow-hidden shadow relative">
    <div class="flex justify-center items-center h-[140px] overflow-hidden">
      <img class="scale-110" :src="product.thumbnail" />
    </div>
    <div class="flex items-center justify-between p-3">
      <p class="font-semibold text-nowrap w-3/4 overflow-hidden overflow-ellipsis">
        {{ product.title }}
      </p>
      <p>{{ product.price }} $</p>
    </div>
    <p class="absolute top-4 text-sm text-white bg-red-500 p-1 rounded w-fit">
      - {{ product.discountPercentage }} %
    </p>
    <div class="flex items-center gap-4 p-4">
      <div class="w-full" v-if="user">
        <button
          v-if="isAlreadyInStore"
          @click="store.commit('DELETE_FROM_CART', { product })"
          class="w-full p-1 bg-gray-500 text-white rounded duration-300 hover:bg-gray-600"
        >
          Remove
        </button>
        <button
          v-else
          @click="store.commit('ADD_TO_CART', { product })"
          class="w-full p-1 bg-green-600 text-white rounded duration-300 hover:bg-green-700"
        >
          Add to cart
        </button>
      </div>
      <router-link
        :to="{ name: 'product', params: { id: product.id } }"
        class="w-full p-1 bg-blue-500 text-center text-white rounded duration-300 hover:bg-blue-600"
      >
        Details
      </router-link>
    </div>
  </div>
</template>
