<script setup>
import CustomBtn from '@/components/shared/CustomBtn.vue'
import EmailInput from '@/components/forms/EmailInput.vue'
import PasswordInput from '@/components/forms/PasswordInput.vue'
import FormStatus from '@/components/forms/FormStatus.vue'
import ConfirmPasswordInput from '@/components/forms/ConfirmPasswordInput.vue'
import NameInput from '@/components/forms/NameInput.vue'
import { signupValidator } from '@/utils/validators'

import { reactive, ref, computed } from 'vue'
import { ax } from '@/axios.config'
import { useRouter } from 'vue-router'

const router = useRouter()
const requestError = ref('')

const form = reactive({
  fullName: {
    value: '',
    touched: false,
    error: ''
  },
  email: {
    value: '',
    touched: false,
    error: ''
  },
  password: {
    value: '',
    touched: false,
    error: ''
  },
  confirm: {
    value: '',
    touched: false,
    error: ''
  }
})

const formHasError = computed(
  () => form.email.error || form.password.error || form.confirm.error || form.fullName.error
)

let isSubbmitting = ref(false)

async function signup() {
  requestError.value = ''
  signupValidator(form)
  if (formHasError.value) {
    requestError.value = 'Please re-validate your inputs'
    return
  }
  try {
    isSubbmitting.value = true
    const userData = {
      fullName: form.fullName.value,
      email: form.email.value,
      password: form.password.value
    }
    await ax.post('/auth/signup', userData)
    router.push({ name: 'login' })
  } catch (error) {
    isSubbmitting.value = false
    if (error.response.status === 409) {
      requestError.value = 'You already have an account'
    } else {
      requestError.value = 'Somthing went wrong, try again later'
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-12 justify-center items-center h-dvh md:mx-auto md:w-[550px]">
    <h1 class="text-3xl font-semibold">Sign up</h1>
    <form @submit.prevent="signup" class="flex flex-col w-full px-8">
      <FormStatus :requestError="requestError" />
      <NameInput v-model="form.fullName" :error="form.fullName.error" />
      <EmailInput v-model="form.email" :error="form.email.error" />
      <PasswordInput v-model="form.password" :error="form.password.error" />
      <ConfirmPasswordInput
        v-model="form.confirm"
        :password="form.password.value"
        :error="form.confirm.error"
      />
      <CustomBtn :isSubmitting="isSubbmitting" lable="Login" type="submit" />
    </form>
    <p class="text-gray-500">
      Already have an account?
      <RouterLink class="duration-300 text-blue-500 hover:text-blue-800" :to="{ name: 'login' }"
        >Login
      </RouterLink>
    </p>
  </div>
</template>
../axios.config
