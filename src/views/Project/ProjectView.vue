<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import SearchBar from '@/components/common/SearchBar.vue'
import ProjectTable from './component/ProjectTable.vue'
import ConfirmDialog from '@/components/UI/ConfirmDialog.vue'
import TableLoader from '@/components/UI/TableLoader.vue'
import { useProjects } from '@/components/composable/useProject.js'
import { useAuth } from '@/components/composable/useAuth'

// Composables
const { projects, loading, error, fetchProjects, deleteProject } = useProjects()
const { currentUser, fetchCurrentUser } = useAuth()

// State
const searchQuery = ref('')
const snackbar = ref({ show: false, message: '', color: 'success' })
const dialog = ref(false)
const deleteId = ref(null)
const deleting = ref(false)

// Fetch projects + user on mount
onMounted(async () => {
  await fetchProjects()
  if (!currentUser.value) {
    await fetchCurrentUser()
  }
})

// ✅ Filtered projects (search feature)
const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value

  const term = searchQuery.value.toLowerCase().trim()
  return projects.value.filter((p) =>
    [p.project_name, p.category, p.status, p.implementation_type, p.year_implemented]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(term)),
  )
})

// (Optional) debounce for smoother typing
let timeout
watch(searchQuery, (val) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    searchQuery.value = val.trim()
  }, 200)
})

// Handle delete
const handleDelete = (id) => {
  deleteId.value = id
  dialog.value = true
}

// Confirm delete action
const confirmDelete = async () => {
  deleting.value = true
  try {
    await deleteProject(deleteId.value)
    await fetchProjects()
    snackbar.value = { show: true, message: 'Project deleted successfully', color: 'success' }
  } catch (err) {
    snackbar.value = {
      show: true,
      message: error.value || 'Failed to delete project',
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
    <!-- Header -->
    <div class="mt-6 mb-8">
      <h1 class="text-h4 font-weight-bold fade-in delay-50">Project List</h1>
      <p class="text-body-2 text-grey-darken-1 mt-2 fade-in delay-50">
        The project list effectively dictates project presentation and provides space to list your
        projects in the most appealing way.
      </p>
    </div>

    <!-- Search & Add Button -->
    <v-row class="mb-4">
      <v-col cols="12" sm="6">
        <SearchBar v-model="searchQuery" placeholder="Search by project..." />
      </v-col>

      <v-col cols="12" sm="6" class="d-flex justify-end align-center fade-in">
        <RouterLink v-if="currentUser?.role_id === 1" to="projects/add">
          <v-btn
            class="btn text-subtitle-1 font-weight-regular rounded-lg text-none"
            color="primary"
          >
            <v-icon icon="mdi-file-plus" start></v-icon>
            Add Project
          </v-btn>
        </RouterLink>
      </v-col>
    </v-row>

    <!-- Table -->
    <div class="mb-5">
      <TableLoader :loading="loading" :rows="6">
        <ProjectTable
          :items="filteredProjects"
          :loading="loading"
          :onDelete="handleDelete"
          :role="currentUser?.role_id"
        />
      </TableLoader>
    </div>

    <!-- Confirm Delete Dialog -->
    <ConfirmDialog
      :dialog="dialog"
      @update:dialog="dialog = $event"
      title="Confirm Delete"
      message="Are you sure you want to delete this project?"
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
