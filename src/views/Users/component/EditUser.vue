<template>
  <UserForm :modelValue="user" :roles="roles" :isEdit="true" @submit="updateUser" />
</template>

<script setup>
import UserForm from '@/components/common/UsersForm.vue'
import { ref, onMounted } from 'vue'

const roles = [
  { id: 1, label: 'Admin' },
  { id: 2, label: 'User' },
]

const user = ref(null)

onMounted(() => {
  // fetch user from API
  user.value = {
    id: 10,
    name: 'Juan Dela Cruz',
    email: 'juan@example.com',
    role_id: 2,
  }
})

function updateUser(user) {
  console.log('Updating user:', user)
  // API call → axios.put(`/api/users/${user.id}`, user)
}
</script>
