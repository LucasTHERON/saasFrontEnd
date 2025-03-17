<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.js'
import Menubar from 'primevue/menubar';

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
            url: '/dashboard', 
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
            url: '###'
        },
        {
            label: 'Signout',
            icon: 'pi pi-sign-out',
            url: '/login'
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope'
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
        }
    ];
}



</script>

<template>

  <Menubar :model="items" />

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
</style>
