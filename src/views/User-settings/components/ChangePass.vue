<script setup>
import { ref } from 'vue'
import { useUsers } from '@/components/composable/useUser'

const { changePassword } = useUsers()

const form = ref({
  old_password: '',
  new_password: '',
  new_password_confirmation: '',
})

const loading = ref(false)
const snackbar = ref({ show: false, message: '', color: 'success' })

const handleSubmit = async () => {
  loading.value = true
  try {
    await changePassword(form.value)
    snackbar.value = { show: true, message: 'Password updated successfully', color: 'success' }
    form.value = { old_password: '', new_password: '', new_password_confirmation: '' }
  } catch (err) {
    snackbar.value = {
      show: true,
      message: err.response?.data?.error || 'Failed to change password',
      color: 'error',
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-card class="mb-6 pa-6" elevation="2">
    <h3 class="mb-4">Change Password</h3>

    <v-text-field v-model="form.old_password" label="Old Password" type="password" outlined />
    <v-text-field v-model="form.new_password" label="New Password" type="password" outlined />
    <v-text-field
      v-model="form.new_password_confirmation"
      label="Confirm New Password"
      type="password"
      outlined
    />

    <v-btn color="primary" :loading="loading" @click="handleSubmit">Update Password</v-btn>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-card>
</template>
