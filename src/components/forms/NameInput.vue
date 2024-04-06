<script setup>
import { fullnameValidator } from '@/utils/validators.js'

const fullNameObject = defineModel()

defineProps({
  error: String
})

function validateFullName() {
  fullnameValidator(fullNameObject.value)
}

function fullNameTouched() {
  fullNameObject.value.touched = true
  validateFullName()
}
</script>

<template>
  <div class="flex flex-col gap-3 mb-8">
    <label for="fullname">Full Name</label>
    <input
      class="border rounded p-3"
      :class="error ? ' border-red-500' : ''"
      id="fullname"
      type="text"
      placeholder="Jhon Doe"
      autocomplete="cc-name"
      v-model="fullNameObject.value"
      @input="validateFullName"
      @blur="fullNameTouched"
    />
    <p class="text-sm text-red-600 h-3">{{ error }}</p>
  </div>
</template>
