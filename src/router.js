import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

import AddFile from './pages/project/AddFile.vue'
import AddProject from './pages/project/AddProject.vue'
import FileData from './pages/project/FileData.vue'
import Project from './pages/project/Project.vue'
import ProjectData from './pages/project/ProjectData.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
  },
  {
    path: '/project/add',
    name: 'Add project',
    component: AddProject,
  },
  {
    path: '/project/data',
    name: 'Project data',
    component: ProjectData,
  },
  {
    path: '/project/file/data',
    name: 'File data',
    component: FileData,
  },
  {
    path: '/project/file/add',
    name: 'Add data',
    component: AddFile,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router