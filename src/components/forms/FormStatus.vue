<script setup>
defineProps({
  requestError: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="h-12 mb-6">
    <p v-if="requestError" class="text-center text-red-800 bg-red-50 p-3 rounded">
      {{ requestError }}
    </p>
  </div>
</template>
