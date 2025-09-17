<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  drawer: Boolean,
  role: { type: Number, default: 2 }, // 1 = admin, 2 = user
})

const emit = defineEmits(['update:drawer'])

const drawerLocal = ref(props.drawer)
watch(
  () => props.drawer,
  (val) => (drawerLocal.value = val),
)

const roleMap = {
  1: 'admin',
  2: 'user',
}
const roleName = computed(() => roleMap[props.role] || 'guest')

// Base menu items without prefixes
const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', path: 'dashboard', roles: ['admin', 'user'] },
  { title: 'Projects', icon: 'mdi-folder', path: 'projects', roles: ['admin', 'user'] },
  { title: 'Users', icon: 'mdi-account', path: 'users', roles: ['admin'] }, // admin only
  { title: 'Reports', icon: 'mdi-file-chart', path: 'reports', roles: ['admin', 'user'] },
  { title: 'Settings', icon: 'mdi-cog', path: 'settings', roles: ['admin', 'user'] },
]

// Add prefix (/admin or /user) dynamically
const filteredMenuItems = computed(() => {
  if (roleName.value === 'guest') return []

  const prefix = roleName.value === 'admin' ? '/admin' : '/user'
  return menuItems
    .filter((item) => item.roles.includes(roleName.value))
    .map((item) => ({
      ...item,
      to: `${prefix}/${item.path}`,
    }))
})
</script>

<template>
  <v-navigation-drawer v-model="drawerLocal" @update:modelValue="emit('update:drawer', $event)" app>
    <!-- User Info -->
    <div class="d-flex align-center pa-5">
      <v-avatar size="40">
        <v-img src="https://i.pravatar.cc/300" alt="User Avatar" />
      </v-avatar>
      <span class="ml-5 font-weight-bold text-subtitle-1"> {{ roleName.toUpperCase() }} User </span>
    </div>

    <v-divider />

    <!-- Menu Items -->
    <v-list class="my-5">
      <v-list-item
        v-for="item in filteredMenuItems"
        :key="item.title"
        :to="item.to"
        :prepend-icon="item.icon"
        :class="{ 'active-link': $route.path === item.to }"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>

    <v-divider />

    <!-- Logout -->
    <v-list>
      <v-list-item to="/" prepend-icon="mdi-logout"> Logout </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
