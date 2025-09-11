<script setup>
import { ref } from 'vue'
import AppNavbar from '@/components/system/AppNavBar.vue'
import Sidebar from '@/components/system/Sidebar.vue'

const drawer = ref(true)
</script>

<template>
  <v-app>
    <AppNavbar v-model:drawer="drawer" />
    <Sidebar v-model:drawer="drawer" />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scope></style>
