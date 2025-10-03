<script setup>
import { ref, onMounted } from 'vue'
import { useUsers } from '@/components/composable/useUser'
import { useAuth } from '@/components/composable/useAuth'

const { updateUser } = useUsers()
const { currentUser, fetchCurrentUser } = useAuth()

const form = ref({
  name: '',
  email: '',
})

const loading = ref(false)
const snackbar = ref({ show: false, message: '', color: 'success' })

onMounted(async () => {
  if (!currentUser.value) {
    await fetchCurrentUser()
  }
  if (currentUser.value) {
    form.value.name = currentUser.value.name
    form.value.email = currentUser.value.email
  }
})

const saveProfile = async () => {
  loading.value = true
  try {
    await updateUser(currentUser.value.id, form.value)
    snackbar.value = { show: true, message: 'Profile updated successfully', color: 'success' }
  } catch (err) {
    snackbar.value = {
      show: true,
      message: err.response?.data?.message || 'Failed to update profile',
      color: 'error',
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-card class="mb-6 pa-6" elevation="2">
    <h3 class="mb-4">Profile Information</h3>

    <v-text-field v-model="form.name" label="Name" outlined />
    <v-text-field v-model="form.email" label="Email" type="email" outlined />

    <v-btn color="primary" :loading="loading" @click="saveProfile">Save Changes</v-btn>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-card>
</template>
