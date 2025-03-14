<script>
import { computed, ref, reactive, watch } from 'vue'
import { getCSRFToken, useAuthStore } from '../../store/auth.js'
import { useRoute, useRouter } from 'vue-router'

import displayFile from '../../components/displayFile.vue'
import displayFileList from '../../components/displayFileList.vue'

export default {
    components: {
        displayFile,
        displayFileList
    },
    data(){
        return{
            error: '',
            success: '',
            newData: '',
            dataSourceId: ''
        }
    },
    setup() {
        let slug = ''
        let projectData = reactive({
        });
        const authStore = useAuthStore()
        const router = useRouter()
        const route = useRoute()
        const getSlug = computed(() => {
            return route.query.id
        });

        async function fetchData(id){
            id = id.replace(' ','');
            id = id.replace('/','');
            slug = id;
            const response = await fetch('http://localhost:8000/api/data/projects/project?id=' + slug, {
                    method: 'GET',
                    credentials: 'include',
                })
            if(response.status !== 200){
                if(response.status >= 400){
                    console.error('Error loading data')
                    console.log("redirect")
                    // router.push('/dashboard');
                }
            }else{
                const data = await response.json()
                const decodedData = JSON.parse(data.data)
                if(decodedData && decodedData){
                    Object.assign(projectData, decodedData);
                }
                return data
            }
        }

        watch(getSlug, async (slug) => {
            if(slug){
                try {
                    const data = await fetchData(slug);
                    console.log('Data received:', data);
                    const project = data.data
                    console.log(JSON.parse(project));

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                
            }else{
                // No valid slug provided
                console.log("redirect")
                // router.push('/dashboard');
            }
        }, { immediate: true })

        return {
            authStore,
            projectData,
            getSlug,
            slug
        }
    },
    methods: {
        async deleteProject(){
            if(!this.slug || this.slug == ""){
                console.log(this.slug)
                console.error("Slug is not defined yet")
                return
            }
            try {
                const response = await fetch('http://localhost:8000/api/data/projects/delete?id=' + this.slug, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: JSON.stringify({
                        slug: this.slug,
                    }),
                    credentials: 'include'
                })
                const data = await response.json()

                if (response.ok) {
                    this.success = 'Le bat a bien été supprmé'
                    setTimeout(() => {
                        this.$router.push('/dashboard')
                    }, 1000)
                } else {
                    this.error = data.error || 'Echec'
                    console.error('Erreur')
                }
            } catch (err) {
                this.error = 'Il y a eu une erreur ' + err
            }
        },
        async updateProject(){
            if(!this.newName){
                console.error('Il faut ajouter un nom');
                return;
            }
            try {
                const name = this.newName
                console.log("Name : " + name)
                const response = await fetch('http://localhost:8000/api/data/projects/update?id=' + this.slug, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: JSON.stringify({
                        name: this.newName,
                    }),
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    this.success = 'Le bat a bien été ajouté'
                    this.projectData.name = this.newName
                    this.newName = ''
                } else {
                    this.error = data.error || 'Echec'
                }
            } catch (err) {
                this.error = 'Il y a eu une erreur ' + err
            }
        },
        displayFileComponent(id){
            this.dataSourceId = id
        }

    },
    mounted(){
        // console.log(this.projectData)
        // this.getProject();
        console.log("Mounted")

    }
}


</script>

<template >
<h1>PROJECT</h1>
<div v-if="authStore.isAuthenticated" >
    <p>Hi there {{ authStore.user?.username }}!</p> 
    <div v-if="projectData">
        <p>This project name is {{ projectData.name }}!</p>
        <p>Slug id {{ projectData.slug }}!</p>
        <label>newName :</label>
        <textarea v-model="newName" />
        <button style="background: salmon" @click="deleteProject">Delete project</button> | 
        <button style="background: lightgreen" @click="updateProject">Update project</button>
        <br><br><br>
        <a :href="'/project/data?id='+ projectData.slug">Project's data</a> | <a :href="'project/file/add?id='+ projectData.slug">Add data</a>
        <hr>

        <!-- DISPLAY FILE LIST -->
        <div>
            <div v-if="projectData.files">
                <displayFileList :files="projectData.files" />
            </div>
            <div v-else>
                <h1>No file yet</h1>
            </div>
        </div>
        <!---->
    </div>

    <p v-if="success" style="color:green">{{ success }}</p>
    <p v-if="error" style="color:red">{{ error }}</p>
    <label>dataSourceId :</label>
    <textarea v-model="dataSourceId" /><br>
    <button style="background: aliceblue" @click="() => displayFileComponent('hello')">Display Hello</button> | 
    <button style="background: aliceblue" @click="() => displayFileComponent('world')">Display World</button> | 
    <button style="background: aliceblue" @click="() => displayFileComponent('')">Display None</button>



    <!-- DISPLAY SELECTED FILE -->
    <div v-if="dataSourceId">
        <displayFile :source="dataSourceId" />
    </div>

</div>
<p v-else>
    You are not logged in . 
    <router-link to="/login"> Login </router-link>
</p>

</template>