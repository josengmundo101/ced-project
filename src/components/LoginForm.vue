<template>
  <v-form class="pa-2" @submit.prevent="handleLogin">
    <v-text-field
      v-model="email"
      label="Email"
      variant="outlined"
      :error="!!errors.email"
      :error-messages="errors.email"
    ></v-text-field>

    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      variant="outlined"
      :error="!!errors.password"
      :error-messages="errors.password"
    ></v-text-field>

    <v-btn
      class="submit-btn mt-2 text-white rounded-xl"
      type="submit"
      color="primary"
      :loading="loading"
      block
      flat
    >
      Login
    </v-btn>

    <!-- Snackbar for general messages -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '@/components/composable/useAuth'
import router from '@/router'

const { login } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const snackbar = ref({ show: false, message: '', color: 'success' })

// Object to hold field-specific errors
const errors = ref({
  email: '',
  password: '',
})

async function handleLogin() {
  loading.value = true
  errors.value = { email: '', password: '' } // reset field errors

  try {
    await login(email.value, password.value)
    snackbar.value = { show: true, message: 'Login successful', color: 'success' }
    router.push({ name: 'admin-dashboard' })
  } catch (err) {
    console.error('❌ Login failed:', err)

    // Default error message
    snackbar.value = {
      show: true,
      message: err.response?.data?.message || 'Invalid credentials',
      color: 'error',
    }

    // If backend returns Laravel validation errors
    if (err.response?.data?.errors) {
      const backendErrors = err.response.data.errors
      if (backendErrors.email) errors.value.email = backendErrors.email[0]
      if (backendErrors.password) errors.value.password = backendErrors.password[0]
    } else {
      // Fallback: highlight both if login fails
      errors.value.email = 'Invalid email or password'
      errors.value.password = 'Invalid email or password'
    }
  } finally {
    loading.value = false
  }
}
</script>
