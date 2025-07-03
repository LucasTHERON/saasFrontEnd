<script>
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'
import DisplayDashboard from '../components/DisplayDashboard.vue'


export default {
    components: {
        DisplayDashboard,
    },
    data(){
        return{
            projects: []
        }
    },
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        return {
            authStore,
            router
        }
    },
    methods: {
        async getProjectList() {
            const response = await fetch('http://localhost:8000/api/data/projects/get-project-list', {
                method: 'GET',
                credentials: 'include',
            })
            console.log(response.status)
            if(response.status !== 200){
                if(response.status === 204){
                    console.log('Empty project list')
                    this.projects = []
                }
                if(response.status >= 400){
                    console.log('Error loading projects')
                }
            }else{
                const data = await response.json()
                const output = JSON.parse(data.projects)
                this.projects = output
            }

        },
    },
    mounted(){
        this.getProjectList();
    }
}

</script>

<template>

<h2>DASHBOARD</h2> 
<div v-if="this.projects">
    <DisplayDashboard :projectList="this.projects" :user="authStore.user"/>
</div>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

<div v-if="authStore.isAuthenticated" >
    <p> Hi there {{ authStore.user?.username }}! </p> 
    <p> Get project list </p>
    <button @click ="getProjectList">Get List</button>
    <div v-for="(project, index) in projects">
        <h2>{{ project.name }} from {{ project.owner }}</h2>
        <p>{{ project.description }}</p>
        <p>Index : {{ index }}</p>
        <p>Slug : {{ project.slug }}</p>
        <a :href="'/project?id='+ project.slug">Link</a>
    </div>
    <div>Ajouter un project</div>
    <div v-if="projects.length > 0" style="color:red">Liste non vide</div>
    <div v-else style="color:red">Liste vide</div>

</div>
<p v-else>
    You are not logged in . 
    <router-link to="/login"> Login </router-link>
</p>

</template>