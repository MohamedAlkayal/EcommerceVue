<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const cartItemsCount = computed(() => {
  return store.state.cart.length
})
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-medium mb-8 p-4 bg-gray-200 rounded-lg">Cart</h1>
    <div class="flex gap-4 p-4 border mb-4 rounded" v-for="item in store.state.cart" :key="item.id">
      <div class="flex gap-4">
        <div class="w-24 rounded-lg overflow-hidden">
          <img class="scale-110" :src="item.thumbnail" />
        </div>
        <div>
          <routerLink
            :to="{ name: 'product', params: { id: item.id } }"
            class="text-lg font-medium mb-2"
            >{{ item.title }}</routerLink
          >
          <p>{{ item.price }} $</p>
        </div>
      </div>
    </div>
    <div class="text-center text-gray-600" v-if="cartItemsCount === 0">There is no items yet</div>
  </div>
</template>
