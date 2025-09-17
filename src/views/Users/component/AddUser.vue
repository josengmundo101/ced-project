<template>
  <v-responsive class="pa-10">
    <UsersForm
      :roles="roles"
      :isEdit="false"
      :loading="loading"
      :errors="errors"
      @submit="addUser"
    />

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn text @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-responsive>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UsersForm from '@/components/common/UsersForm.vue'
import { useUsers } from '@/components/composable/useUser'

const router = useRouter()
const { createUser, roles } = useUsers()

const loading = ref(false)
const errors = ref({})
const snackbar = ref({ show: false, message: '', color: 'success' })

async function addUser(user) {
  loading.value = true
  errors.value = {}
  try {
    await createUser(user)
    snackbar.value = { show: true, message: 'User created successfully!', color: 'success' }
    setTimeout(() => router.push({ name: 'users' }), 1000)
  } catch (err) {
    errors.value = err.response?.data?.errors || {}
    snackbar.value = { show: true, message: 'Failed to create user', color: 'error' }
  } finally {
    loading.value = false
  }
}
</script>
