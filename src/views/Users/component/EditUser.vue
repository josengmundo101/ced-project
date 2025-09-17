<template>
  <div>
    <UsersForm
      v-if="user"
      :modelValue="user"
      :roles="roles"
      :isEdit="true"
      :loading="loading"
      :errors="errors"
      @submit="updateUser"
    />

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn text @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UsersForm from '@/components/common/UsersForm.vue'
import { useUsers } from '@/components/composable/useUser'

const route = useRoute()
const router = useRouter()

const { getUser, updateUser: apiUpdateUser, roles } = useUsers()
const user = ref(null)
const loading = ref(false)
const errors = ref({})
const snackbar = ref({ show: false, message: '', color: 'success' })

onMounted(async () => {
  try {
    user.value = await getUser(route.params.id)
  } catch (err) {
    console.error('Failed to fetch user', err)
  }
})

async function updateUser(updatedUser) {
  loading.value = true
  errors.value = {}
  try {
    await apiUpdateUser(updatedUser.id, updatedUser)

    // Show snackbar on success
    snackbar.value = {
      show: true,
      message: 'User updated successfully!',
      color: 'success',
    }

    // Optionally delay before redirect so user sees feedback
    setTimeout(() => {
      router.push({ name: 'users' })
    }, 800)
  } catch (err) {
    errors.value = err.response?.data?.errors || {}
    snackbar.value = {
      show: true,
      message: 'Failed to update user',
      color: 'error',
    }
  } finally {
    loading.value = false
  }
}
</script>
