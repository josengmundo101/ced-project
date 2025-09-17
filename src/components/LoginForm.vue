<template>
  <v-form class="pa-2" @submit.prevent="login">
    <v-text-field v-model="email" :rules="rules" label="Email" variant="outlined"></v-text-field>

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
import { useRouter } from 'vue-router'
import api from '@/utils/api'

const email = ref('')
const password = ref('')
const rules = []

const router = useRouter()

const login = async () => {
  try {
    const { data } = await api.post('/login', {
      email: email.value,
      password: password.value,
    })

    // Save token + full user object (includes role_id)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // Redirect based on role_id
    if (data.user.role_id === 1) {
      await router.push({ name: 'admin-dashboard' })
    } else if (data.user.role_id === 2) {
      await router.push({ name: 'user-dashboard' })
    } else {
      // fallback if role_id is something else
      await router.push({ name: 'login' })
    }
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message)
  }
}
</script>
