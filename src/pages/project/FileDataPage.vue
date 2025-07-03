<script>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCSRFToken, useAuthStore } from '../../store/auth'

import FileUpload from 'primevue/fileupload';
import SelectButton from 'primevue/selectbutton';
import DisplayExtractedData from '../../components/DisplayExtractedData.vue'
import RawDataTable from '../../components/data/RawDataset.vue'
import DoubleEntryDataTable from '../../components/data/DoubleEntryDataset.vue'



export default {
    components: {
        FileUpload,
        SelectButton,
        DisplayExtractedData,
        RawDataTable,
        DoubleEntryDataTable
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
            tabOptions: ['Document', 'Data'],
            tabValue:'Data',
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
            extractedData: null,
            rawData: null
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
        changeData() {
            let newData = [
                {
                "key": "Glouks liquides",
                "value": "en forte croissance",
                "type": "str",
                "category": "Catégories de Glouks"
                },
                {
                "key": "Glouks en poudre",
                "value": "stable",
                "type": "str",
                "category": "Catégories de Glouks"
                },
                {
                "key": "Glouks compressés",
                "value": "en déclin",
                "type": "str",
                "category": "Catégories de Glouks"
                },
                {
                "key": "NanoGlouks",
                "value": "stable",
                "type": "str",
                "category": "Catégories de Glouks"
                },
                {
                "key": "EcoGlouks",
                "value": "en mutation",
                "type": "str",
                "category": "Catégories de Glouks"
                },
                {
                "key": "Europe",
                "value": [
                    6.66,
                    9.24,
                    2.53,
                    7.6,
                    6.86
                ],
                "type": "array",
                "category": "Croissance régionale"
                },
                {
                "key": "Amérique du Nord",
                "value": [
                    8.81,
                    7.08,
                    2.88,
                    5.87,
                    9.12
                ],
                "type": "array",
                "category": "Croissance régionale"
                },
                {
                "key": "Asie-Pacifique",
                "value": [
                    7.79,
                    6.36,
                    9.12,
                    3.7,
                    5.58
                ],
                "type": "array",
                "category": "Croissance régionale"
                },
                {
                "key": "Amérique Latine",
                "value": [
                    9.36,
                    3.47,
                    6.71,
                    2.35,
                    4.83
                ],
                "type": "array",
                "category": "Croissance régionale"
                },
                {
                "key": "Afrique",
                "value": [
                    3.88,
                    3.16,
                    4.66,
                    2.9,
                    6.73
                ],
                "type": "array",
                "category": "Croissance régionale"
                },
                {
                "key": "Croissance totale estimée d’ici 2030",
                "value": 87.5,
                "type": "float",
                "category": "Prévisions"
                },
                {
                "key": "Part des NanoGlouks dans la croissance",
                "value": 45,
                "type": "int",
                "category": "Prévisions"
                },
                {
                "key": "Part des EcoGlouks dans la croissance",
                "value": 22,
                "type": "int",
                "category": "Prévisions"
                },
                {
                "key": "Durabilité",
                "value": "impact fort sur conception et consommation",
                "type": "str",
                "category": "Tendances"
                },
                {
                "key": "Personnalisation",
                "value": "impact fort sur conception et consommation",
                "type": "str",
                "category": "Tendances"
                },
                {
                "key": "Intelligence artificielle",
                "value": "impact fort sur conception et consommation",
                "type": "str",
                "category": "Tendances"
                },
                {
                "key": "Distribution automatisée",
                "value": "impact fort sur conception et consommation",
                "type": "str",
                "category": "Tendances"
                },
                {
                "key": "Consommation immersive",
                "value": "impact fort sur conception et consommation",
                "type": "str",
                "category": "Tendances"
                }
            ]
            let newArray = {}
            // this.extractedData = []
            newData.forEach(el => {

                // newArray.push({[el.key]: el.value})
                newArray[el.key] = el.value

            })
            console.log(newArray)
            // this.extractedData = newArray
            this.extractedData = []
            this.extractedData.push(newArray)
            console.log(this.extractedData)

            // this.extractedData = [{"a":"a"},{"b":"b"}]
        },
        eraseData(){
            this.extractedData = ''
        },
        trySomethingNew(){
            // title = models.CharField(max_length=50, default='Dataset') -
            // description = models.CharField(max_length=50, blank=True)
            // type = models.IntegerField(default=0)
            // columns = models.TextField(blank=True)
            // data = models.TextField(blank=True)
            // unit = models.CharField(max_length=50, blank=True)
            let title = "Titre des données"
            let description = "Les données brut récoltées"
            let type = 0 // 0 ===> Raw data
            let columns = null
            let unit = null
            let data = [
                {"key": "Glouks liquides", "value": "en forte croissance", "type": "str", "category": "Catégories de Glouks"},
                {"key": "Glouks en poudre", "value": "stable", "type": "str", "category": "Catégories de Glouks"},
                {"key": "Glouks compressés", "value": "en déclin", "type": "str", "category": "Catégories de Glouks"},
                {"key": "NanoGlouks", "value": "stable", "type": "str", "category": "Catégories de Glouks"},
                {"key": "EcoGlouks", "value": "en mutation", "type": "str", "category": "Catégories de Glouks"},
                
                {"key": "Europe", "value": [6.66, 9.24, 2.53, 7.6, 6.86], "type": "array", "category": "Croissance régionale"},
                {"key": "Amérique du Nord", "value": [8.81, 7.08, 2.88, 5.87, 9.12], "type": "array", "category": "Croissance régionale"},
                {"key": "Asie-Pacifique", "value": [7.79, 6.36, 9.12, 3.7, 5.58], "type": "array", "category": "Croissance régionale"},
                {"key": "Amérique Latine", "value": [9.36, 3.47, 6.71, 2.35, 4.83], "type": "array", "category": "Croissance régionale"},
                {"key": "Afrique", "value": [3.88, 3.16, 4.66, 2.9, 6.73], "type": "array", "category": "Croissance régionale"},

                {"key": "Croissance totale estimée d’ici 2030", "value": 87.5, "type": "float", "category": "Prévisions"},
                {"key": "Part des NanoGlouks dans la croissance", "value": 45, "type": "int", "category": "Prévisions"},
                {"key": "Part des EcoGlouks dans la croissance", "value": 22, "type": "int", "category": "Prévisions"},

                {"key": "Durabilité", "value": "impact fort sur conception et consommation", "type": "str", "category": "Tendances"},
                {"key": "Personnalisation", "value": "impact fort sur conception et consommation", "type": "str", "category": "Tendances"},
                {"key": "Intelligence artificielle", "value": "impact fort sur conception et consommation", "type": "str", "category": "Tendances"},
                {"key": "Distribution automatisée", "value": "impact fort sur conception et consommation", "type": "str", "category": "Tendances"},
                {"key": "Consommation immersive", "value": "impact fort sur conception et consommation", "type": "str", "category": "Tendances"}
            ]
            let newArray = {}
            data.forEach((el, i) => {
                newArray[i] = el
            })
            this.rawData = newArray
            console.log(this.rawData)
            // console.log('-')
            // console.log(this.rawData)
            // console.log('-')
        }
        

    },
    mounted() {
        this.extractedData = 
            [
                {
                    "contrat": "colocation meublée",
                    "bailleur_nom": "",
                    "bailleur_prenom": "",
                    "bailleur_adresse": "Pessac",
                    "bailleur_email": "",
                    "colocataire_nom": "",
                    "colocataire_prenom": "",
                    "prix": 5000,
                    "colocataire_email": "",
                    "garant_nom": "Néant",
                    "logement_consistance": "Chambre privative de 12 m2 à l'étage d’une Maison Individuelle de 110 m2",
                    "logement_adresse": "PESSAC",
                    "logement_autres_parties": ["1 terrasse", "jardin"],
                    "equipements": ["cuisine équipée", "Salles d’eau équipées", "1 toilette indépendante", "salon de jardin", "table", "six chaises"],
                    "chauffage": "individuel électrique",
                    "eau_chaude": "Ballon Thermodynamique",
                    "destination_locaux": "Usage habitation uniquement pour résidence principale",
                    "annexes": "Local destiné uniquement aux vélos",
                    "stationnement": "véhicules autorisées sur les aires destinées à cet effet",
                    "technologie_acces": ["wifi", "box Fibre orange", "raccordement TV"]
                },
                {
                    "contrat": "colocation meublée",
                    "bailleur_nom": "THERON",
                    "bailleur_prenom": "Lucas",
                    "bailleur_adresse": "Lyon",
                    "bailleur_email": "",
                    "colocataire_nom": "",
                    "colocataire_prenom": "",
                    "colocataire_email": "",
                    "prix": 15000,
                    "garant_nom": "THERON Lucas",
                    "logement_consistance": "Appartement 220m²",
                    "logement_adresse": "PESSAC",
                    "logement_autres_parties": ["1 terrasse", "jardin"],
                    "equipements": ["cuisine équipée", "Salles d’eau équipées", "1 toilette indépendante", "salon de jardin", "table", "six chaises"],
                    "chauffage": "individuel électrique",
                    "eau_chaude": "Ballon Thermodynamique",
                    "destination_locaux": "Usage habitation uniquement pour résidence principale",
                    "annexes": "Local destiné uniquement aux vélos",
                    "stationnement": "véhicules autorisées sur les aires destinées à cet effet",
                    "technologie_acces": ["wifi", "box Fibre orange", "raccordement TV"]
                }
            ]
        // this.eraseData()        
        // this.trySomethingNew()
    }
}
</script>
<template>

<SelectButton v-model="tabValue" :options="tabOptions" />
<br><br>
<button @click="eraseData">Effacer les données</button>
<button @click="changeData">Changer les données</button> 
<button @click="trySomethingNew">Testons des choses</button>
<br><br>
<!-- <RawDataTable v-if="rawData" :dataset="rawData"/> -->
<RawDataTable v-if="rawData" :dataset="rawData"/>
<DoubleEntryDataTable />

<div v-if="tabValue === 'Document'" style="border: 1px solid grey; padding: 20px 30px; min-height: 300px">
    <h3>This place will be to display file</h3>
</div>
<div v-if="tabValue === 'Data'">
    <!-- <DisplayExtractedData  v-if="extractedData" :extractedData="extractedData">
    </DisplayExtractedData> -->
</div>







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