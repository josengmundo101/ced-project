<script setup>
import ProfileForm from './components/ProfileInfo.vue'
import ChangePasswordForm from './components/ChangePass.vue'
</script>

<template>
  <v-container class="py-10">
    <h1 class="text-h5 font-weight-bold mb-6">User Settings</h1>

    <ProfileForm />
    <ChangePasswordForm />
  </v-container>
</template>
