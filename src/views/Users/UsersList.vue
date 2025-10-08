<!-- UsersList.vue -->
<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SearchBar from '@/components/common/SearchBar.vue'
import UsersTable from './component/UsersTable.vue'
import ConfirmDialog from '@/components/UI/ConfirmDialog.vue'
import { useUsers } from '@/components/composable/useUser'
import TableLoader from '@/components/UI/TableLoader.vue'

// composable
const { users, loading, error, fetchUsers, deleteUser } = useUsers()

// state
const searchQuery = ref('')
const snackbar = ref({ show: false, message: '', color: 'success' })
const dialog = ref(false)
const deleteId = ref(null)
const deleting = ref(false)

// Fetch users on mount
onMounted(() => {
  fetchUsers()
})

// searchQuery for User
// const filteredUser = computed(() => {
//   if (!searchQuery.value) return users.value

//   const term = searchQuery.value.toLowerCase().trim()

//   return users.value.filter((user) =>
//     user.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
//   )
// })

// // (Optional) debounce for smoother typing
// let timeout
// watch(searchQuery, (val) => {
//   clearTimeout(timeout)
//   timeout = setTimeout(() => {
//     searchQuery.value = val.trim()
//   }, 200)
// })

// Handle delete (open dialog)
const handleDelete = (id) => {
  console.log('handleDelete called with ID:', id) // 👈 debug
  deleteId.value = id
  dialog.value = true
}

// Confirm delete action
const confirmDelete = async () => {
  console.log('[Parent] Confirm delete for ID:', deleteId.value)
  deleting.value = true
  try {
    await deleteUser(deleteId.value)
    console.log('[Parent] User deleted, refreshing list...')
    await fetchUsers()
    snackbar.value = { show: true, message: 'User deleted successfully', color: 'success' }
  } catch (err) {
    console.error('[Parent] Delete error:', err)
    snackbar.value = {
      show: true,
      message: error.value || 'Failed to delete user',
      color: 'error',
    }
  } finally {
    deleting.value = false
    dialog.value = false
    deleteId.value = null
  }
}
</script>

<template>
  <v-responsive class="pa-10">
    <div class="mt-6 mb-8">
      <h1 class="text-h4 font-weight-bold fade-in delay-50">Users List</h1>
      <p class="text-body-2 text-grey-darken-1 mt-2 fade-in delay-100">
        The user list effectively dictates user presentation and provides space to list your users
        and offering in the most appealing way.
      </p>
    </div>

    <v-row class="mb-4">
      <v-col cols="12" sm="6">
        <SearchBar v-model="searchQuery" placeholder="Search by name..." />
      </v-col>
      <v-col cols="12" sm="6" class="d-flex justify-end align-center fade-in">
        <RouterLink :to="{ name: 'users-add' }">
          <v-btn
            class="btn text-subtitle-1 font-weight-regular rounded-lg text-none"
            color="primary"
          >
            <v-icon icon="mdi-account" start></v-icon>Add User
          </v-btn>
        </RouterLink>
      </v-col>
    </v-row>

    <div class="mb-5">
      <TableLoader :loading="loading" :rows="6">
        <UsersTable :items="users" :loading="loading" :onDelete="handleDelete" />
      </TableLoader>
    </div>

    <ConfirmDialog
      :dialog="dialog"
      @update:dialog="dialog = $event"
      title="Confirm Delete"
      message="Are you sure you want to delete this user?"
      confirm-text="Delete"
      cancel-text="Cancel"
      confirm-color="error"
      :loading="deleting"
      :snackbar="snackbar"
      @update:snackbar="snackbar = $event"
      @confirm="confirmDelete"
    />
  </v-responsive>
</template>
