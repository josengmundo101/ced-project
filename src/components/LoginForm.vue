<template>
  <v-form class="pa-2" @submit.prevent="handleLogin">
    <v-text-field v-model="email" label="Email" variant="outlined"></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      variant="outlined"
    ></v-text-field>

    <v-btn class="submit-btn mt-2 text-white rounded-xl" type="submit" color="primary" block flat>
      Login
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/components/composable/useAuth'
import router from '@/router'

const { login } = useAuth()
const snackbar = ref({ show: false, message: '', color: 'success' })
const loading = ref(false)

const email = ref('')
const password = ref('')

// handle form submission
async function handleLogin() {
  loading.value = true
  try {
    await login(email.value, password.value) // call from useAuth
    snackbar.value = { show: true, message: 'Login successful', color: 'success' }
    router.push({ name: 'admin-dashboard' }) // redirect after login
  } catch (err) {
    console.error('❌ Login failed:', err)
    snackbar.value = { show: true, message: 'Invalid credentials', color: 'error' }
  } finally {
    loading.value = false
  }
}
</script>
