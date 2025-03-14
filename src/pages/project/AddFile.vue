<script>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCSRFToken, useAuthStore } from '../../store/auth'

import FileUpload from 'primevue/fileupload';
import SelectButton from 'primevue/selectbutton';
import DisplayExtractedData from '../../components/DisplayExtractedData.vue'



export default {
    components: {
        FileUpload,
        SelectButton,
        DisplayExtractedData
    },
    data(){
        return{
            name: '',
            error: '',
            success: '',
            extracted_data: '',
            imported_file: 'aa',
            fileName: '',
            fileDescription: '',
            options: ['Document', 'Data'],
            value:'Document',
            nodes: [],
            dataDepth: 0,
            depthStep: computed(() => { if(this.dataDepth == 0){
                    return 0;
                }else{
                    return 50 / this.dataDepth;
                }
            }),
            dataIndex: 0,
            dataArray: [],
            extractedData: null
        }
    },
    setup(){
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
        beforeSend(request) {
            console.log(this.fileName)
            if(!this.fileName){
                this.error = 'Name is required'
                return
            }
            console.log('before send')
            const xhr = request.formData.append('hello', 'world')
            request.formData.append('slug', this.slug)
            request.xhr.open('POST', 'http://localhost:8000/api/data/files/add')
            request.xhr.setRequestHeader('X-CSRFToken',  getCSRFToken())
            return request
            // request.formData.append('hello', 'world')

            // const post = request.formData.append('hello', 'world')
            // console.log(xhr)
            // console.log(post)
        },
        onUpload(){
            console.log('uploadedid"')
            console.log('okokok')
            this.success = 'Le fichier a bien été importé';
            if(1 == 2){
                setTimeout(() => {
                    this.$router.push('/project?id=' + this.slug)
                }, 1000)
            }
        },
        onError(){
            console.log('une erreur')
        },

    },
    mounted() {
        this.extractedData = 
            {"voitures": [
                    {
                    "marque": "Toyota",
                    "modele": "Camry",
                    "annee": 2022,
                    "caracteristiques": {
                        "moteur": {
                        "type": "Essence",
                        "cylindree": "2.5L",
                        "puissance": "203 ch"
                        },
                        "transmission": {
                        "type": "Automatique",
                        "vitesses": 8,
                        "traction": "Avant"
                        },
                        "dimensions": {
                        "longueur": "4885 mm",
                        "largeur": "1840 mm",
                        "hauteur": "1445 mm"
                        },
                        "options": ["Climatisation", "Régulateur de vitesse", "Sièges chauffants"]
                    }
                    },
                    {
                    "marque": "Tesla",
                    "modele": "Model 3",
                    "annee": 2023,
                    "caracteristiques": {
                        "moteur": {
                        "type": "Electrique",
                        "batterie": "75 kWh",
                        "autonomie": "576 km"
                        },
                        "transmission": {
                        "type": "Automatique",
                        "traction": "Arrière ou Intégrale"
                        },
                        "dimensions": {
                        "longueur": "4694 mm",
                        "largeur": "1849 mm",
                        "hauteur": "1443 mm"
                        },
                        "options": ["Pilote automatique", "Toit panoramique", "Ecran tactile 15 pouces"]
                    }
                    },
                    {
                    "marque": "Ford",
                    "modele": "Mustang",
                    "annee": 2021,
                    "caracteristiques": {
                        "moteur": {
                        "type": "Essence",
                        "cylindree": "5.0L V8",
                        "puissance": "460 ch"
                        },
                        "transmission": {
                        "type": "Manuelle ou Automatique",
                        "vitesses": 6,
                        "traction": "Arrière"
                        },
                        "dimensions": {
                        "longueur": "4784 mm",
                        "largeur": "1916 mm",
                        "hauteur": "1394 mm"
                        },
                        "options": ["Sièges en cuir", "Système audio premium", "Suspension sport"]
                    }
                    }
                ]
            }

    }
}
</script>
<template>

<SelectButton v-model="value" :options="options" />


<div style="border: 1px solid grey; padding: 20px 30px; min-height: 300px">
    <h1> AJOUTER FILE </h1>
    <h4>{{ value }}</h4>
    <label>Nom : </label>
    <input v-model="fileName"></input>
    <label>Description : </label>
    <input v-model="fileDescription"></input>
    <FileUpload
        :customUpload="false" :withCredentials="true" :maxFileSize="1000000"
        @before-send="beforeSend" @error="onError" @upload="onUpload"
        url="http://localhost:8000/api/data/files/add" class="uploadSection" name="files" accept=".txt"
    >
        <template #empty>
            <span>Drag and drop files to here to upload.</span>
        </template>
    </FileUpload>
    <button @click="addFile">Ajouter</button> 
</div>
<DisplayExtractedData v-if="extractedData" :extractedData="extractedData">
</DisplayExtractedData>


<p v-if="success">
    {{ success }}
</p>

<p v-if="error">
    {{ error }}
</p>



</template>

<style>
.uploadSection .p-fileupload-content{
    min-height: 450px;
}
</style>