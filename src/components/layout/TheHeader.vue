<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const cartItemsCount = computed(() => store.state.cart.length)
let user = computed(() => store.state.user)

function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  sessionStorage.removeItem('user')
  sessionStorage.removeItem('token')
  store.commit('REMOVE_USER')
  router.push({ name: 'home' })
}

const isProductsRoute = computed(() => router.currentRoute.value.name === 'products')
</script>

<template>
  <header class="bg-white shadow-md p-6 mb-8 sticky top-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex gap-8 items-center">
        <RouterLink :to="{ name: 'home' }" class="font-bold text-2xl">Market</RouterLink>
        <ul class="hidden sm:flex gap-4">
          <li>
            <router-link
              activeClass="text-blue-500"
              :class="{ 'text-blue-500': isProductsRoute }"
              :to="{ name: 'products', params: { category: 'all-products', page: 1 } }"
              >Products</router-link
            >
          </li>
          <li>
            <router-link activeClass="text-blue-500" :to="{ name: 'about' }"> About </router-link>
          </li>
          <li>
            <router-link activeClass="text-blue-500" :to="{ name: 'contact' }"
              >Contact us
            </router-link>
          </li>
        </ul>
      </div>
      <div v-if="user" class="relative hidden sm:flex items-center gap-3">
        <router-link
          :to="{ name: 'cart' }"
          class="cursor-pointer flex items-center gap-2 bg-gray-100 p-2 px-6 rounded duration-300 hover:bg-gray-200"
        >
          <img class="w-4" src="@/assets/icons/shopping-cart.svg" alt="" />
          <p class="text-black">{{ cartItemsCount }}</p>
        </router-link>
        <div
          class="cursor-pointer p-2 px-6 bg-blue-500 text-white rounded duration-300 hover:bg-blue-600"
          @click="logout"
        >
          Logout
        </div>
      </div>
      <RouterLink
        class="p-2 px-6 bg-blue-500 text-white rounded duration-300 hover:bg-blue-600"
        v-else
        :to="{ name: 'login' }"
        >Login</RouterLink
      >
      <img class="w-[24px] sm:hidden" src="@/assets/icons/menu-burger.svg" />
    </div>
  </header>
</template>
