<script setup>
import { emailValidator } from '@/utils/validators.js'

const emailObject = defineModel()

defineProps({
  error: String
})

function validateEmail() {
  emailValidator(emailObject.value)
}

function emailTouched() {
  emailObject.value.touched = true
  validateEmail()
}
</script>

<template>
  <div class="flex flex-col gap-3 mb-8">
    <label for="email">Email</label>
    <input
      class="border rounded p-3"
      :class="error ? ' border-red-500' : ''"
      id="email"
      type="text"
      placeholder="example@mail.com"
      autocomplete="email"
      v-model="emailObject.value"
      @input="validateEmail"
      @blur="emailTouched"
    />
    <p class="text-sm text-red-600 h-3">{{ error }}</p>
  </div>
</template>
