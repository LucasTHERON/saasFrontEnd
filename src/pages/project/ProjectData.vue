<script>
import { computed, ref, reactive, watch } from 'vue'
import { getCSRFToken, useAuthStore } from '../../store/auth.js'
import { useRoute, useRouter } from 'vue-router'

export default {
    components: {
       
    },
    data(){
        return{
            error: '',
            success: '',
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
       hello(){
        console.log('hello')
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
<h1>PROJECT DATA</h1>
<div v-if="authStore.isAuthenticated" >
    <p>Hi there {{ authStore.user?.username }}!</p> 
    <div v-if="projectData">
        <p>This project name is {{ projectData.name }}!</p>
        <p>Slug id {{ projectData.slug }}!</p>
        <a :href="'/project?id='+ projectData.slug">Link</a>
    </div>

    <p v-if="success" style="color:green">{{ success }}</p>
    <p v-if="error" style="color:red">{{ error }}</p>


</div>
<p v-else>
    You are not logged in . 
    <router-link to="/login"> Login </router-link>
</p>

</template>