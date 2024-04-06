<script setup>
import SpinnerSvg from './SpinnerSvg.vue'

const { lable, type, onClick, isSubmitting } = defineProps({
  lable: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button'
  },
  onClick: {
    type: () => {}
  },
  isSubmitting: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <button
    :disabled="isSubmitting"
    :type="type"
    @click="onClick"
    :class="isSubmitting ? ' opacity-60 ' : ''"
    class="flex justify-center cursor-pointer text-white p-3 rounded bg-blue-500 duration-300 hover:bg-blue-700"
  >
    <SpinnerSvg v-if="isSubmitting" />
    <p v-else>{{ lable }}</p>
  </button>
</template>
