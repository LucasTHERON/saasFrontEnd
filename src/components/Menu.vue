<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.js'
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';

const authStore = useAuthStore()
const router = useRouter()

async function logout() {
    try {
        await authStore.logout(router)
    } catch (error) {
        console.error(error)
    }
}

let items = ref([])

function toggleDarkMode(){
    document.documentElement.classList.toggle('my-app-dark')
}

if(authStore.isAuthenticated){
    items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        {
            label: 'Projects',
            icon: 'pi pi-folder',
            items: [
                {
                    label: 'Dashboard',
                    icon: 'pi pi-list',
                    url: '/dashboard'
                },
                {
                    label: 'Add',
                    icon: 'pi pi-folder-plus',
                    url: '/project/add'
                },
            ]
        },
        {
            label: 'Data',
            icon: 'pi pi-chart-bar',
            url: '/databoard'
        },
        {
            label: 'Log out',
            icon: 'pi pi-sign-out',
            command: logout
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
        },
        {
            label: 'Admin',
            icon: 'pi pi-user',
            url: 'http://localhost:8000/admin/'
        },
        {
            command: toggleDarkMode,
            icon: 'pi pi-moon',           
        }      
    ];
}else{
    items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            url: '/'
        },
        {
            label: 'Login',
            icon: 'pi pi-sign-in',
            url: '/login'
        },
        {
            label: 'Register',
            icon: 'pi pi-star',
            url: '/register'
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            url: '/contact'
        },
        {
            command: toggleDarkMode,
            icon: 'pi pi-moon',           
        }
    ];
}



</script>

<template>

  <Menubar id="main-menu" :model="items" />

</template>

<style scoped>

h1{
  margin:0
}

.nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
}

#main-menu .p-menubar-root-list, .p-menubar-submenu{
    margin: 0 auto !important;
}

</style>
