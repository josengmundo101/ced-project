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
      { path: 'projects/edit', name: 'project-edit', component: EditProject },
      { path: 'users', name: 'users', component: UsersList },
      { path: 'users/add', name: 'users-add', component: AddUser },
      {
        path: '/admin/users/edit/:id',
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
      { path: 'reports', name: 'user-reports', component: ReportView },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
