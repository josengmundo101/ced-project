<template>
  <v-form class="pa-2" @submit.prevent>
    <v-text-field v-model="email" :rules="rules" label="Username" variant="outlined"></v-text-field>

    <v-text-field
      hint="Enter your password to access this website"
      v-model="password"
      label="Password"
      type="input"
      variant="outlined"
    ></v-text-field>

    <v-btn class="submit-btn mt-2 text-white rounded-xl" type="submit" color="primary" block flat
      >Login</v-btn
    >
  </v-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rules = [] // Define your validation rules here
</script>

<style scoped>
.submit-btn {
  background-color: #181919; /* Vuetify primary color */
}
</style>
