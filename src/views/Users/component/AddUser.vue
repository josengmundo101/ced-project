<template>
  <UserForm :roles="roles" :isEdit="false" @submit="addUser" />
</template>

<script setup>
import UserForm from '@/components/common/UsersForm.vue'

const roles = [
  { id: 1, label: 'Admin' },
  { id: 2, label: 'User' },
]

function addUser(user) {
  console.log('Adding new user:', user)
  // API call → axios.post('/api/users', user)
}
</script>
