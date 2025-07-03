<script>
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'
import { getCSRFToken } from '../store/auth.js'

import Dashboard from '../components/dashboard/Dashboard.vue'
import AddProjectForm from '../components/dashboard/AddProjectForm.vue'

import Button from 'primevue/button';


export default {
    components: {
        Dashboard,
        AddProjectForm,
        Button
    },
    data(){
        return{
            projects: [],
            display: 'dashboard'
        }
    },
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        if(authStore.isAuthenticated == false){
            router.push('/login');
        }

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
                console.log(output)
            }

        },
        async addProject(formData) {
            if(!formData.name){
                console.error('Name variable missing');
                return;
            }
            try {
                const response = await fetch('http://localhost:8000/api/data/projects/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        city: formData.city,
                        postcode: formData.postcode,
                        direction: formData.direction,
                        description: formData.description,
                    }),
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    this.success = 'Le bat a bien été ajouté'
                    // setTimeout(() => {
                    //     this.$router.push('/project/data/update?slug=' + data.slug)
                    // }, 1000)
                } else {
                    this.error = data.error || 'Echec'
                }
            } catch (err) {
                this.error = 'Il y a eu une erreur ' + err
            }
        },
        setDisplay(component){
            this.display = component
        }
    },
    mounted(){
        this.getProjectList();
    }
}

</script>

<template>
<h1>Dashboard</h1> 
<div v-if="display == 'dashboard'">
    
    <div v-if="this.projects">
        <Dashboard :projectList="this.projects" :user="authStore.user"/>
        <br/>
        <Button @click="() => { setDisplay('addProjectForm') }"label="Add project" />
    </div>
    <div v-else>
        <h2>No project was created yet</h2>
        <br/>
        <Button @click="() => { setDisplay('addProjectForm') }" label="Add project" />
    </div>
</div>

<div v-if="display == 'addProjectForm'">
    <AddProjectForm @add-project="addProject" @set-display="setDisplay"/>
</div>

<p v-if="success">{{  success }}</p>
<p v-if="error">{{  error }}</p>

<!-- <br>
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
</p> -->

</template>