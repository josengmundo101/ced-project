<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../composable/useAuth'
import ConfirmDialog from '../UI/ConfirmDialog.vue'
import router from '@/router'

const { currentUser, logout, fetchCurrentUser } = useAuth()

onMounted(() => {
  fetchCurrentUser()
})

const props = defineProps({
  drawer: Boolean,
  role: { type: Number, default: 2 }, // 1 = admin, 2 = user
})
const emit = defineEmits(['update:drawer'])

// --- Logout confirmation ---
const dialog = ref(false)
const snackbar = ref({ show: false, message: '', color: 'success' })
const loading = ref(false)

const roleMap = { 1: 'admin', 2: 'user' }
const roleName = computed(() => roleMap[props.role] || 'guest')

const menuItems = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', path: 'dashboard', roles: ['admin', 'user'] },
  { title: 'Projects', icon: 'mdi-folder', path: 'projects', roles: ['admin', 'user'] },
  { title: 'Users', icon: 'mdi-account', path: 'users', roles: ['admin'] }, // admin only
  { title: 'Reports', icon: 'mdi-file-chart', path: 'reports', roles: ['admin', 'user'] },
  { title: 'Settings', icon: 'mdi-cog', path: 'settings', roles: ['admin', 'user'] },
]

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

// Handle logout click
function openLogoutDialog() {
  dialog.value = true
}
async function confirmLogout() {
  loading.value = true
  try {
    await logout()
    snackbar.value = { show: true, message: 'Logged out successfully', color: 'success' }
    router.push({ path: '/' })
  } catch (err) {
    snackbar.value = { show: true, message: 'Logout failed', color: 'error' }
    console.error('❌ Logout error:', err)
  } finally {
    loading.value = false
    dialog.value = false
  }
}
</script>

<template>
  <v-navigation-drawer
    v-model="props.drawer"
    @update:modelValue="emit('update:drawer', $event)"
    app
  >
    <!-- User Info -->
    <div class="d-flex align-center pa-5">
      <v-avatar size="40">
        <v-img src="https://i.pravatar.cc/300" alt="User Avatar" />
      </v-avatar>
      <span class="ml-5 font-weight-bold text-subtitle-1">
        {{ currentUser?.name || 'Loading...' }}
      </span>
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
    <v-list-item link prepend-icon="mdi-logout" @click="openLogoutDialog"> Logout </v-list-item>

    <ConfirmDialog
      :dialog="dialog"
      @update:dialog="dialog = $event"
      title="Confirm logout"
      message="Are you sure you want to Logout this user?"
      confirm-text="Yes"
      cancel-text="No"
      confirm-color="error"
      :loading="loading"
      :snackbar="snackbar"
      @update:snackbar="snackbar = $event"
      @confirm="confirmLogout"
    />
  </v-navigation-drawer>
</template>
