<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import Menubar from 'primevue/menubar';

const route = useRoute();
const pageName = route.name;
console.log(route)
console.log("page name is " + route.name)
console.log("page name is " + pageName)

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: '###'
    },
    {
        label: 'Features',
        icon: 'pi pi-star'
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt'
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server'
            },
            {
                label: 'UI Kit',
                icon: 'pi pi-pencil'
            },
            {
                label: 'Templates',
                icon: 'pi pi-palette',
                items: [
                    {
                        label: 'Apollo',
                        icon: 'pi pi-palette'
                    },
                    {
                        label: 'Ultima',
                        icon: 'pi pi-palette'
                    }
                ]
            }
        ]
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope'
    }
]);




</script>

<template>

  <Menubar :model="items" />
  <h1>Vous êtes sur la page {{ pageName }}</h1>

  <div class="nav">
      <p><a href="/">Home</a></p>
      <p><a href="/register">Register</a></p>
      <p><a href="/login">Login</a></p>
      <p><a href="/dashboard">Dashboard</a></p>
      <p><a href="/project/add">Add project</a></p>
      <p> <a @click ="logout">Logout</a></p>
  </div>

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
