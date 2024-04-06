<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))

onMounted(() => {
  if (user) {
    console.log(user)
    store.commit('ADD_USER', { user })
  }
})
</script>

<template>
  <RouterView />
</template>
