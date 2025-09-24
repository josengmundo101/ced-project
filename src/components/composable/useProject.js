import { ref } from 'vue'
import api from '@/utils/api'

export function useProjects() {
  const projects = ref([])
  const currentProject = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const snackbar = ref({ show: false, message: '', color: 'success' })

  function showSnackbar(message, color = 'success') {
    snackbar.value = { show: true, message, color }
  }

  // ✅ Fetch all projects
  const fetchProjects = async () => {
    loading.value = true
    console.log('[useProjects] Fetching projects...')
    try {
      const res = await api.get('/projects')
      projects.value = res.data
      console.log('[useProjects] Projects fetched:', res.data)
      showSnackbar('Projects loaded successfully')
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch projects'
      console.error('[useProjects] Fetch error:', err)
      showSnackbar(error.value, 'error')
    } finally {
      loading.value = false
    }
  }

  // ✅ Get single project by ID
  const getProject = async (id) => {
    loading.value = true
    console.log(`[useProjects] Fetching project ID: ${id}`)
    try {
      const res = await api.get(`/projects/${id}`)
      console.log('[useProjects] Project fetched:', res.data)
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch project'
      console.error('[useProjects] Get error:', err)
      showSnackbar(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  // ✅ Create new project (supports multiple files)
  const createProject = async (payload) => {
    loading.value = true
    console.log('[useProjects] Creating project...', payload)
    try {
      let formData = new FormData()

      for (const key in payload) {
        if (Array.isArray(payload[key])) {
          payload[key].forEach((file) => {
            formData.append(`${key}[]`, file)
          })
        } else {
          formData.append(key, payload[key])
        }
      }

      const res = await api.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log('[useProjects] Project created:', res.data)
      showSnackbar('Project created successfully')
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create project'
      console.error('[useProjects] Create error:', err)
      showSnackbar(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  // ✅ Update project (supports multiple files)
  const updateProject = async (id, payload) => {
    loading.value = true
    console.log(`[useProjects] Updating project ID: ${id}`, payload)
    try {
      let formData = new FormData()

      for (const key in payload) {
        if (Array.isArray(payload[key])) {
          payload[key].forEach((file) => {
            formData.append(`${key}[]`, file)
          })
        } else {
          formData.append(key, payload[key])
        }
      } // 👈 this was missing before

      const res = await api.post(`/projects/${id}?_method=PUT`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log('[useProjects] Project updated:', res.data)
      showSnackbar('Project updated successfully')
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update project'
      console.error('[useProjects] Update error:', err)
      showSnackbar(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  // ✅ Delete project
  const deleteProject = async (id) => {
    loading.value = true
    console.log(`[useProjects] Deleting project ID: ${id}`)
    try {
      const res = await api.delete(`/projects/${id}`)
      console.log('[useProjects] Project deleted:', res.data)
      showSnackbar('Project deleted successfully')
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete project'
      console.error('[useProjects] Delete error:', err)
      showSnackbar(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    projects,
    currentProject,
    error,
    loading,
    snackbar,
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
  }
}
