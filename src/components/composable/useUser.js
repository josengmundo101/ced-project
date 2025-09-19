import { ref } from 'vue'
import api from '@/utils/api'

export function useUsers() {
  const users = ref([])
  const roles = ref([
    { id: 1, label: 'Admin' },
    { id: 2, label: 'User' },
  ])

  const error = ref(null)
  const loading = ref(false)
  const snackbar = ref({ show: false, message: '', color: 'success' })

  function showSnackbar(message, color = 'success') {
    snackbar.value = { show: true, message, color }
  }

  const fetchUsers = async () => {
    loading.value = true
    console.log('[useUsers] Fetching users...')
    try {
      const res = await api.get('/users') // 👈 uses api.js
      users.value = res.data.map((user) => {
        const role = roles.value.find((r) => r.id === user.role_id)
        return {
          ...user,
          rolelabel: role ? role.label : 'N/A',
        }
      })
      console.log('[useUsers] Users fetched:', res.data)
      showSnackbar('Users loaded successfully')
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch users'
      console.error('[useUsers] Fetch error:', err)
      showSnackbar(error.value, 'error')
    } finally {
      loading.value = false
    }
  }

  const getUser = async (id) => {
    loading.value = true
    console.log(`[useUsers] Fetching user ID: ${id}`)
    try {
      const res = await api.get(`/users/${id}`)
      console.log('[useUsers] User fetched:', res.data)
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch user'
      console.error('[useUsers] Get user error:', err)
      showSnackbar(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  const createUser = async (payload) => {
    loading.value = true
    console.log('[useUsers] Creating user:', payload)
    try {
      const res = await api.post('/users', payload)
      console.log('[useUsers] User created:', res.data)
      showSnackbar('User created successfully')
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create user'
      console.error('[useUsers] Create error:', err)
      showSnackbar(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id, payload) => {
    loading.value = true
    console.log(`[useUsers] Updating user ID: ${id}`, payload)
    try {
      const res = await api.put(`/users/${id}`, payload)
      console.log('[useUsers] User updated:', res.data)
      showSnackbar('User updated successfully')
      return res.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update user'
      console.error('[useUsers] Update error:', err)
      showSnackbar(error.value, 'error')
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id) => {
    try {
      console.log('[useUser] Attempting DELETE /users/' + id)
      const res = await api.delete(`/users/${id}`)
      console.log('[useUser] Delete success:', res.data)
      return res.data
    } catch (err) {
      console.error('[useUser] Delete failed:', err.response?.status, err.response?.data)
      error.value =
        err.response?.data?.error || err.response?.data?.message || 'Failed to delete user'
      throw err
    }
  }
  return {
    users,
    roles,
    error,
    loading,
    snackbar,
    fetchUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  }
}
