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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/admin',
      component: AppLayout,
      meta: { requiresAuth: true, role: 'admin' }, // Restrict to admin only
      children: [
        { path: 'dashboard', name: 'dashboard', component: Dashboard },
        // Project route,
        { path: 'projects', name: 'project', component: ProjectView },
        // Project route for Admin
        { path: 'projects/add', name: 'project/add', component: AddProject },
        { path: 'projects/edit', name: 'project/edit', component: EditProject },
        // User route
        { path: 'users', name: 'users', component: UsersList },
        // Add User route for Admin
        { path: 'users/add', name: 'users/add', component: AddUser },
        { path: 'users/edit', name: 'users/edit', component: EditUser },
        // Report route
        { path: 'reports', name: 'reports', component: ReportView },
      ],
    },
  ],
})

export default router
