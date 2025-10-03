import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/components/AppLayout.vue'
import Dashboard from '@/views/Dashboard/Dashboard.vue'
import LoginView from '@/views/LoginView.vue'
import ProjectView from '@/views/Project/ProjectView.vue'
import UsersList from '@/views/Users/UsersList.vue'
import AddUser from '@/views/Users/component/AddUser.vue'
import EditUser from '@/views/Users/component/EditUser.vue'
import AddProject from '@/views/Project/component/AddProject.vue'
import EditProject from '@/views/Project/component/EditProject.vue'
import ReportView from '@/views/Report/ReportView.vue'
import ViewProject from '@/views/Project/component/ViewProject.vue'
import SettingsView from '@/views/User-settings/SettingsView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },

  // Admin routes
  {
    path: '/admin',
    component: AppLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      { path: 'dashboard', name: 'admin-dashboard', component: Dashboard },
      { path: 'projects', name: 'admin-projects', component: ProjectView },
      { path: 'reports', name: 'admin-reports', component: ReportView },

      // restricted to admin
      { path: 'projects/add', name: 'project-add', component: AddProject },
      {
        path: 'projects/edit/:id',
        name: 'projects-edit',
        component: EditProject,
        props: true,
      },
      {
        path: 'projects/view/:id',
        name: 'admin-projects-view',
        component: ViewProject,
        props: true,
      },

      { path: 'users', name: 'users', component: UsersList },
      { path: 'users/add', name: 'users-add', component: AddUser },
      {
        path: 'users/edit/:id',
        name: 'users-edit',
        component: EditUser,
        props: true,
      },
    ],
  },

  // User routes
  {
    path: '/user',
    component: AppLayout,
    meta: { requiresAuth: true, role: 'user' },
    children: [
      { path: 'dashboard', name: 'user-dashboard', component: Dashboard },
      { path: 'projects', name: 'user-projects', component: ProjectView },
      { path: 'projects/view:id', name: 'user-projects-view', component: ViewProject, props: true },
      { path: 'reports', name: 'user-reports', component: ReportView },
      { path: 'settings', name: 'user-settings', component: SettingsView },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * 🔒 Global Navigation Guard
 */
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  // If route requires authentication
  if (to.meta.requiresAuth) {
    if (!token || !user) {
      return next({ name: 'login' }) // not logged in → back to login
    }

    // Role check
    if (to.meta.role && user.role_id) {
      const roleMap = {
        1: 'admin',
        2: 'user',
      }

      const userRole = roleMap[user.role_id]

      if (to.meta.role !== userRole) {
        return next({ name: 'login' }) // 🚫 unauthorized → redirect
      }
    }
  }

  // If already logged in and trying to access login → redirect to their dashboard
  if (to.name === 'login' && token && user) {
    if (user.role_id === 1) return next({ name: 'admin-dashboard' })
    if (user.role_id === 2) return next({ name: 'user-dashboard' })
  }

  next()
})

export default router
