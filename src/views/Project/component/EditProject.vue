<template>
  <v-responsive>
    <TableLoader :loading="loading" :rows="6">
      <ProjectForm
        v-if="project"
        :modelValue="project"
        :isEdit="true"
        :loading="loading"
        :errors="errors"
        @submit="updateProject"
      />
    </TableLoader>
    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn text @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-responsive>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectForm from '@/components/common/ProjectForm.vue'
import { useProjects } from '@/components/composable/useProject'
import TableLoader from '@/components/UI/TableLoader.vue'

const route = useRoute()
const router = useRouter()

const { getProject, loading, snackbar, updateProject: apiUpdateProject } = useProjects()
const errors = ref({})
const project = ref(null)

onMounted(async () => {
  try {
    project.value = await getProject(route.params.id)
  } catch (err) {
    console.error('Failed to fetch project', err)
  }
})

async function updateProject(updatedProject) {
  loading.value = true
  errors.value = {}
  try {
    await apiUpdateProject(updatedProject.id, updatedProject)

    snackbar.value = {
      show: true,
      message: 'Project updated successfully!',
      color: 'success',
    }

    setTimeout(() => {
      router.push({ name: 'admin-projects' })
    }, 800)
  } catch (err) {
    errors.value = err.response?.data?.errors || {}
    snackbar.value = { show: true, message: 'Failed to update project', color: 'error' }
  } finally {
    loading.value = false
  }
}
</script>
