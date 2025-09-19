// src/components/composable/useAuth.js
import { ref } from 'vue'
import api from '@/utils/api'
import router from '@/router'

const currentUser = ref(null)
const loading = ref(false)
const error = ref(null)

export function useAuth() {
  /**
   * Fetch currently authenticated user
   */
  const fetchCurrentUser = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/user')
      currentUser.value = data
      console.log('✅ Logged in user:', data)
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch user'
      currentUser.value = null
      console.error('❌ Failed to fetch user:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Login user
   */
  const login = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/login', { email, password })

      // Save token + user
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      currentUser.value = data.user

      // Redirect based on role
      if (data.user.role_id === 1) {
        await router.push({ name: 'admin-dashboard' })
      } else if (data.user.role_id === 2) {
        await router.push({ name: 'user-dashboard' })
      } else {
        await router.push({ name: 'login' })
      }

      return data.user
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      console.error('❌ Login failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await api.post('/logout')
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      // Clear everything
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      currentUser.value = null

      await router.push({ name: 'login' })
    }
  }

  return {
    currentUser,
    fetchCurrentUser,
    login,
    logout,
    loading,
    error,
  }
}
