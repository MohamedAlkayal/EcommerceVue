<script setup>
import { confirmPasswordValidator } from '@/utils/validators.js'
import { ref } from 'vue'

const confirmdObject = defineModel()

const isPsaaword = ref(true)

const props = defineProps({
  error: String,
  password: String
})

function validateConfirm() {
  confirmPasswordValidator(props.password, confirmdObject.value)
}

function confirmTouched() {
  confirmdObject.value.touched = true
  validateConfirm()
}

function toggleVisibility() {
  isPsaaword.value = !isPsaaword.value
}
</script>

<template>
  <div class="flex flex-col gap-3 mb-8 relative">
    <label for="cpassword">Confirm Password</label>
    <input
      class="border rounded p-3"
      :class="error ? ' border-red-500' : ''"
      id="cpassword"
      :type="isPsaaword ? 'password' : 'text'"
      placeholder="********"
      autocomplete="new-password"
      v-model="confirmdObject.value"
      @input="validateConfirm"
      @blur="confirmTouched"
    />
    <p class="text-sm text-red-600 h-5">{{ error }}</p>
    <span
      @click="toggleVisibility"
      class="cursor-pointer text-[10px] absolute right-6 top-[55px] duration-300 hover:text-blue-500"
      >{{ isPsaaword ? 'show' : 'hide' }}</span
    >
  </div>
</template>
