<script>
import { computed, ref, reactive, watch } from 'vue'
import { getCSRFToken, useAuthStore } from '../../store/auth.js'
import { useRoute, useRouter } from 'vue-router'

import DataTable from 'primevue/datatable';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import SelectButton from 'primevue/selectbutton';
import UploadFile from '../../components/UploadFile.vue'


import DisplaySampleData from '../../components/DisplaySampleData.vue'
import DisplayFilePreview from '../../components/DisplayFilePreview.vue'
import DisplayTeam from '../../components/DisplayTeam.vue'
import DisplaySchedule from '../../components/DisplaySchedule.vue'

export default {
    components: {
        DisplaySampleData,
        DisplayFilePreview,
        DisplayTeam,
        DisplaySchedule,
        DataTable,
        Button,
        Card,
        Column,
        ColumnGroup,
        Row,
        SelectButton,
        UploadFile
    },
    data(){
        return{
            error: '',
            success: '',
            newData: '',
            selectedFile: null,
            projectFiles: null,
            metaKey: '',
            options: ['Files', 'Planning', 'Team', 'Data', 'Configuration'],
            display: 'Files',
        }
    },
    setup() {
        let slug = ''
        let projectData = reactive({});
        let projectDataArr = reactive([]);
        let teamList = reactive([])
        
        let projectFiles = reactive([]);
        const authStore = useAuthStore()
        const router = useRouter()
        const route = useRoute()
        const getSlug = computed(() => {
            return route.query.id
        });

        async function fetchProject(id){
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
                console.log("Poject overall data:")
                console.log(data)
                return data
            }
        }

        async function fetchProjectData(slug){
            const response = await fetch('http://localhost:8000/api/data/projects/data/get?slug=' + slug, {
                    method: 'GET',
                    credentials: 'include',
                })
            if(response.status !== 200){
                if(response.status >= 400){
                    console.error('Forbidden')
                    console.log("redirect")
                    // router.push('/dashboard');
                }
            }else{
                const data = await response.json()
                const decodedData = JSON.parse(data.data)
                console.log('decodedData')
                console.log(decodedData)

                // let teamData = JSON.parse(decodedData.team)
                return decodedData
            }
        }

        watch(getSlug, async (slug) => {
            if(slug){
                try {
                    const data = await fetchProject(slug);
                    console.log('Data received:', data);
                    let rawProjectData = data.data

                    projectData = JSON.parse(rawProjectData)
                    for (const [id, object] of Object.entries(projectData)) {
                        projectDataArr[id] = object
                    }

                    const filesJson = JSON.parse(data.files)
                    filesJson.forEach(element => {
                        projectFiles.push(element.fields)
                    });


                    const fetchedData = await fetchProjectData(slug);
                    console.log('data')
                    console.log(fetchedData)
                    const teamData = fetchedData.team
                    console.log(JSON.parse(teamData))

                    for (const [id, object] of Object.entries(JSON.parse(teamData))) {
                        teamList.push(object)
                    }

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
            projectDataArr,
            projectFiles,
            getSlug,
            slug,
            teamList
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
                    this.success = 'Le nom a bien été mis à jour'
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
                    this.success = 'Le projet a bien été mis à jour'
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
            this.selectedFile = id
        },
        updateSelectedFile(file){
            console.log(file);
            this.selectedFile = file
        },
        selectFile(row){
            this.selectedFile = row.data
        },
        test(){
            console.log("----------------------------------------")
            console.log("----------------------------------------")
            console.log("----------------------------------------")
            console.log("CHECKING DATA")
            console.log(this.projectDataArr)
            console.log(this.projectFiles)
            console.log(this.teamList)
            console.log(this.teamList[0])
            console.log(this.slug)
            console.log("----------------------------------------")
            console.log("----------------------------------------")
            console.log("----------------------------------------")
        }
    },
    mounted(){
        // console.log(this.projectData)
        // this.getProject();
        // console.log("Mounted")

    }
}


</script>

<template >
<h1 v-if="projectDataArr">{{  projectDataArr['name'] }}</h1>
<div class="content-container" v-if="authStore.isAuthenticated" >
    <SelectButton v-model="display" :options="options" />


    <div v-if="projectFiles && display == 'Files'">
        <h2>Files <i class="pi pi-file"></i></h2>
        <DataTable :value="projectFiles"
        stripedRows
        selectionMode="single"
        tableStyle="min-width: 50rem"
        @row-click="selectFile"
        @row-dblclick="goToProject"
        >
            <Column filed="id" header="" sortable></Column>
            <Column field="name" header="Name" sortable></Column>
            <Column field="created" header="Created" sortable></Column>
            <Column field="description" header="Description"></Column>
            <Column field="extension" header="Extension"></Column>
        </DataTable>
        <div class="upload-area">
            <h3>Import a file</h3>
            <!-- <label>File's name : </label> <input v-model="fileName"></input> -->
            <!-- <label>Description : </label> <input v-model="fileDescription"></input> -->
            <hr style="opacity: 0.2;">
            <UploadFile v-if="slug" :slug="slug" :multiple='false' />
            <p v-if="success">
                {{ success }}
            </p>

            <p v-if="error">
                {{ error }}
            </p>            
        </div>

        <!-- DISPLAY SELECTED FILE -->
        <div v-if="selectedFile">
            <DisplayFilePreview :document="selectedFile" />
        </div>
        <!-- <div v-if="display == 'Card'" class="card-container">
            <Card v-for="project in projectFiles" style="overflow: hidden">
                <template #header>
                    <img alt="header" src="../../assets/vue.svg" style="width: 100%;
                background: #dedede;
                height: 200px;
                padding: 20px 0;"/>
                </template>
                <template #title>{{ project.name }}</template>
                <template #subtitle>{{ project.name }}</template>
                <template #content>
                    <p class="m-0">
                        {{ project.description }}
                    </p>
                </template>
                <template #footer>
                    <div class="flex gap-4 mt-1 button-container">
                        <Button severity="secondary" icon="pi pi-search" class="button-custom secondary" @click="goToProject(project.slug)">Go to project</Button>
                    </div>
                </template>
            </Card>
        </div> -->
    </div>

    <div v-if="display == 'Planning'">
        <h2>Planning <i class="pi pi-calendar"></i></h2>
        <DisplaySchedule />
    </div>

    <div v-if="teamList && display == 'Team'">
        <h2>Planning <i class="pi pi-users"></i></h2>
        <DisplayTeam :teamList="teamList" @remove-member="removeTeamMember" @update-team="updateTeam"/>
    </div>

    <div v-if="teamList && display == 'Data'">
        <h2>Data <i class="pi pi-chart-bar"></i></h2>
        <DisplaySampleData />
    </div>

    <div v-if="projectDataArr && display == 'Configuration'">
        <h2>Configuration <i class="pi pi-wrench"></i></h2>
        <h3>Project name : {{ projectDataArr['name'] }}</h3>
        <label>Change project name : </label> 
        <input v-model="newName" />
        <hr>
        <button style="background: lightgreen" @click="updateProject">Update project</button>
 | 
        <button style="background: salmon" @click="deleteProject">Delete project</button>
        <br><br><br>

        <a :href="'/project/data?id='+ projectData.slug">Project's data</a> | <a :href="'project/file/add?id='+ projectData.slug">Add data</a> | 
        <a :href="'/project/data/update?id='+ projectData.slug">Update data</a> 
        <hr>
        <!-- <button @click="() => { console.log(projectData)}">Check received data</button>
        <button @click="test">Check received data with this</button> -->
    </div>

    <button @click="test">Check received data with this</button>








</div>

<p v-if="success" style="color:green">{{ success }}</p>
<p v-if="error" style="color:red">{{ error }}</p>


</template>

<style lang="css" scoped>
.upload-area{
    background-color: white;
    margin: 20px auto;
    /* border-radius: 18px; */
    padding: 30px ;
}

.p-togglebutton-content{
    padding-left: 20px;
    padding-right: 20px;
}

.content-container > div{
    position: relative;
}

.pi{
    margin-left: 5px;
    font-size: 20px;
}
</style>