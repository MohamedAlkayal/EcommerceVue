<script setup>
import UsernameInput from '@/components/forms/UsernameInput.vue'
import CustomBtn from '@/components/shared/CustomBtn.vue'
import PasswordInput from '@/components/forms/PasswordInput.vue'
import FormStatus from '@/components/forms/FormStatus.vue'
import { loginValidator } from '@/utils/validators'

import { reactive, ref, computed } from 'vue'
import { ax } from '@/axios.config'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()

const router = useRouter()

let requestError = ref('')
let isSubmitting = ref(false)
let isRemember = ref(true)

const form = reactive({
  username: {
    value: '',
    touched: false,
    error: ''
  },
  password: {
    value: '',
    touched: false,
    error: ''
  }
})

const formHasError = computed(() => form.username.error || form.password.error)

async function login() {
  requestError.value = ''
  loginValidator(form)
  if (formHasError.value) {
    requestError.value = 'Please re-validate your inputs'
    return
  }

  try {
    isSubmitting.value = true
    const userData = {
      username: form.username.value,
      password: form.password.value
    }
    const res = await ax.post('/auth/login', userData)

    store.commit('ADD_USER', { user: res.data })

    if (isRemember.value) {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data))
    } else {
      sessionStorage.setItem('token', res.data.token)
      sessionStorage.setItem('user', JSON.stringify(res.data))
    }
    router.push({ name: 'home' })
  } catch (error) {
    isSubmitting.value = false
    requestError.value = error.response.data.message
  }
}
</script>

<template>
  <div class="flex flex-col gap-12 justify-center items-center h-dvh md:mx-auto md:w-[550px]">
    <h1 class="text-3xl font-semibold">Login</h1>
    <form @submit.prevent="login" class="flex flex-col w-full px-8">
      <FormStatus :requestError="requestError" />
      <UsernameInput v-model="form.username" :error="form.username.error" />
      <PasswordInput v-model="form.password" :error="form.password.error" />
      <CustomBtn :isSubmitting="isSubmitting" lable="Login" type="submit" />
    </form>
    <p class="text-gray-500">
      Don't have an account?
      <RouterLink class="duration-300 text-blue-500 hover:text-blue-800" :to="{ name: 'signup' }"
        >Sign up</RouterLink
      >
    </p>
  </div>
</template>
../axios.config
