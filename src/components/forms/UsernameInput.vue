<script setup>
import { usernameValidator } from '@/utils/validators.js'

const usernameObject = defineModel()

defineProps({
  error: String
})

function validateUsername() {
  usernameValidator(usernameObject.value)
}

function usernameTouched() {
  usernameObject.value.touched = true
  validateUsername()
}
</script>

<template>
  <div class="flex flex-col gap-3 mb-8">
    <label for="username">Username</label>
    <input
      class="border rounded p-3"
      :class="error ? 'border-red-500' : ''"
      id="username"
      type="text"
      placeholder="Enter username"
      autocomplete="username"
      v-model="usernameObject.value"
      @input="validateUsername"
      @blur="usernameTouched"
    />
    <p class="text-sm text-red-600 h-3">{{ error }}</p>
  </div>
</template>
