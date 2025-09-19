<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import ProjectTable from './component/ProjectTable.vue'
import ConfirmDialog from '@/components/UI/ConfirmDialog.vue'
import TableLoader from '@/components/UI/TableLoader.vue'
import { useProjects } from '@/components/composable/useProject.js'

const { projects, loading, error, fetchProjects, deleteProject } = useProjects()

const searchQuery = ref('')
const snackbar = ref({ show: false, message: '', color: 'success' })
const dialog = ref(false)
const deleteId = ref(null)
const deleting = ref(false)

// Fetch projects on mount
onMounted(() => {
  fetchProjects()
})

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
    await deleteProject(deleteId.value)
    console.log('[Parent] Project deleted, refreshing list...')
    await fetchProjects()
    snackbar.value = { show: true, message: 'Project deleted successfully', color: 'success' }
  } catch (err) {
    console.error('[Parent] Delete error:', err)
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
    <div class="mt-6 mb-8">
      <h1 class="text-h4 font-weight-bold fade-in delay-50">Project List</h1>
      <p class="text-body-2 text-grey-darken-1 mt-2 fade-in delay-100">
        The project list effectively dictates project presentation and provides space to list your
        projects and offering in the most appealing way.
      </p>
    </div>

    <v-row class="mb-4">
      <v-col cols="12" sm="6">
        <SearchBar v-model="searchQuery" placeholder="Search by Project..." />
      </v-col>

      <v-col cols="12" sm="6" class="d-flex justify-end align-center">
        <RouterLink to="projects/add"
          ><v-btn
            class="btn text-subtitle-1 font-weight-regular rounded-lg text-none"
            color="primary"
            ><v-icon icon="mdi-file-plus" start></v-icon>Add Project</v-btn
          ></RouterLink
        >
      </v-col>
    </v-row>

    <div class="mb-5">
      <TableLoader :loading="loading" :rows="6">
        <ProjectTable :items="projects" :loading="loading" :onDelete="handleDelete" />
      </TableLoader>
    </div>

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
<!-- <!-- :items="projects" :loading="loading" :onDelete="handleDelete" -->
