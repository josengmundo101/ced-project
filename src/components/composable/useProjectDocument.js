import { ref } from 'vue'
import api from '@/utils/api'

export function useProjectDocuments() {
  const documents = ref([])
  const error = ref(null)
  const loading = ref(false)
  const snackbar = ref({ show: false, message: '', color: 'success' })

  function showSnackbar(message, color = 'success') {
    snackbar.value = { show: true, message, color }
  }

  const fetchDocuments = async (projectId) => {
    loading.value = true
    console.log(`[useProjectDocuments] Fetching documents for project ID: ${projectId}`)
    try {
      const { data } = await api.get(`/projects/${projectId}/documents`)
      documents.value = res.data
      console.log('[useProjectDocuments] Documents fetched:', data)
      showSnackbar('Documents loaded successfully')
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load documents'
      showSnackbar(error.value, 'error')
      console.error('[useProjectDocuments] Fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  const uploadDocument = async (projectId, formData) => {
    loading.value = true
    error.value = null
    try {
      await api.post(`/projects/${projectId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await fetchDocuments(projectId)
      console.log('[useProjectDocuments] Document uploaded successfully')
      showSnackbar('Document uploaded successfully')
    } catch (err) {
      error.value = err.response?.data?.message || 'Upload failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteDocument = async (docId, projectId) => {
    loading.value = true
    try {
      await api.delete(`/documents/${docId}`)
      await fetchDocuments(projectId)
      console.log('[useProjectDocuments] Document deleted successfully')
      showSnackbar('Document deleted successfully')
    } finally {
      loading.value = false
    }
  }

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    uploadDocument,
    deleteDocument,
  }
}
