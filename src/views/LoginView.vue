<template>
  <v-container class="container" fluid>
    <div class="content d-flex flex-column align-center">
      <div class="text-center mb-12">
        <img :src="logo" alt="" width="150" class="mt-5" />
        <v-card-title class="text-h4 font-weight-bold"> City Engineering Department </v-card-title>
        <v-card-subtitle class="font-weight-bold"> City Government of Butuan </v-card-subtitle>
      </div>
      <v-card class="card pa-12 rounded-lg" elevation="5" width="500">
        <LoginForm />
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import logo from '@/assets/cgb-logo.png'
import LoginForm from '@/components/LoginForm.vue'
</script>

<style scoped>
.container {
  background-image: url('@/assets/bg.png');
  background-size: cover;
  display: flex; /* enable flexbox */
  justify-content: center; /* horizontal centering */
  align-items: center; /* vertical centering */
  width: 100vw;
  height: 100vh;
}

a {
  text-decoration: none;
}
</style>
