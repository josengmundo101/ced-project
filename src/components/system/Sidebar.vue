<script setup>
import { ref, watch } from 'vue'

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/admin/dashboard' },
  { title: 'Projects', icon: 'mdi-folder', to: '/admin/projects' },
  { title: 'Users', icon: 'mdi-account', to: '/admin/users' },
  { title: 'Reports', icon: 'mdi-file-chart', to: '/admin/reports' },
  { title: 'Settings', icon: 'mdi-cog', to: '/admin/settings' },
]

const props = defineProps({
  drawer: Boolean,
})
const emit = defineEmits(['update:drawer'])

// Local drawer state to avoid mutating prop directly
const drawerLocal = ref(props.drawer)

watch(
  () => props.drawer,
  (val) => {
    drawerLocal.value = val
  },
)
</script>

<template>
  <v-navigation-drawer v-model="drawerLocal" @update:modelValue="emit('update:drawer', $event)" app>
    <!-- Top: User -->
    <div class="d-flex align-center pa-5">
      <v-avatar size="40">
        <v-img src="https://i.pravatar.cc/300" alt="User Avatar" />
      </v-avatar>
      <span class="ml-5 font-weight-bold text-subtitle-1">Admin User</span>
    </div>

    <v-divider />

    <!-- Middle: Menu (takes all available space) -->
    <v-list class="my-5">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :class="{ 'active-link': $route.path === item.to }"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>

    <v-divider />

    <!-- Bottom: Logout -->

    <v-list>
      <v-list-item to="/logout" prepend-icon="mdi-logout"> Logout </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-navigation-drawer {
  display: flex;
  flex-direction: column;
}
</style>
