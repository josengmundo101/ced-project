<script setup>
import { ref, computed } from 'vue'
import AppNavbar from '@/components/system/AppNavBar.vue'
import Sidebar from '@/components/system/Sidebar.vue'

const drawer = ref(true)

const user = JSON.parse(localStorage.getItem('user') || '{}')
const roleId = computed(() => user?.role_id || 2)
</script>

<template>
  <v-app>
    <AppNavbar @toggle-drawer="drawer = !drawer" />
    <Sidebar :drawer="drawer" :role="roleId" @update:drawer="drawer = $event" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
