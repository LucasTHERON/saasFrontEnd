import { createRouter, createWebHistory } from 'vue-router'
import DataboardPage from './pages/DataboardPage.vue'
import DashboardPageOld from './pages/DashboardOldPage.vue'
import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import RegisterPage from './pages/RegisterPage.vue'

import AddFilePage from './pages/project/AddFilePage.vue'
import AddProjectPage from './pages/project/AddProjectPage.vue'
import FileDataPage from './pages/project/FileDataPage.vue'
import ProjectPage from './pages/project/ProjectPage.vue'
import ProjectDataPage from './pages/project/ProjectDataPage.vue'
import UpdateProjectDataPage from './pages/project/UpdateProjectDataPage.vue'





import Dashboard from './pages/DashboardPage.vue'




const routes = [

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },



  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
  {
    path: '/old/dashboard',
    name: 'olf dashboard',
    component: DashboardPageOld,
  },
  {
    path: '/databoard',
    name: 'databoard',
    component: DataboardPage,
  },
  {
    path: '/project',
    name: 'Project',
    component: ProjectPage,
  },
  {
    path: '/project/add',
    name: 'Add project',
    component: AddProjectPage,
  },
  {
    path: '/project/data',
    name: 'Project data',
    component: ProjectDataPage,
  },
  {
    path: '/project/data/update',
    name: 'Update project data',
    component: UpdateProjectDataPage,
  },
  {
    path: '/project/file/data',
    name: 'File data',
    component: FileDataPage,
  },
  {
    path: '/project/file/add',
    name: 'Add data',
    component: AddFilePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router