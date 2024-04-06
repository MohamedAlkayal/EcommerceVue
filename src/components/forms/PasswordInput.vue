<script setup>
import { passwordValidator } from '@/utils/validators.js'
import { ref } from 'vue'

const passwordObject = defineModel()

const isPsaaword = ref(true)

defineProps({
  error: String
})

function validatePassword() {
  passwordValidator(passwordObject.value)
}

function passwordTouched() {
  passwordObject.value.touched = true
  validatePassword()
}
function toggleVisibility() {
  isPsaaword.value = !isPsaaword.value
}
</script>

<template>
  <div class="flex flex-col gap-3 mb-8 relative">
    <label for="password">Password</label>
    <input
      class="border rounded p-3"
      :class="error ? ' border-red-500' : ''"
      id="password"
      :type="isPsaaword ? 'password' : 'text'"
      placeholder="********"
      autocomplete="new-password"
      v-model="passwordObject.value"
      @input="validatePassword"
      @blur="passwordTouched"
    />
    <p class="text-sm text-red-600 h-5">{{ error }}</p>
    <span
      @click="toggleVisibility"
      class="cursor-pointer text-[10px] absolute right-6 top-[55px] duration-300 hover:text-blue-500"
      >{{ isPsaaword ? 'show' : 'hide' }}</span
    >
  </div>
</template>
