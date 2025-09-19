<template>
  <v-responsive>
    <ProjectForm
      mode="add"
      :isEdit="false"
      :loading="loading"
      :errors="errors"
      @submit="addProject"
    />

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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '@/components/composable/useProject.js'
import ProjectForm from '@/components/common/ProjectForm.vue'

const { createProject, snackbar } = useProjects()
const router = useRouter()

const loading = ref(false)
const errors = ref({})

async function addProject(project) {
  loading.value = true
  errors.value = {}
  try {
    await createProject(project)
    setTimeout(() => router.push({ name: 'admin-projects' }), 1000) // ✅ cleaner redirect
  } catch (err) {
    errors.value = err.response?.data?.errors || {}
  } finally {
    loading.value = false
  }
}
</script>
