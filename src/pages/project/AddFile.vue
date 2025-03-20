<script>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCSRFToken, useAuthStore } from '../../store/auth'
import UploadFile from '../../components/UploadFile.vue'

export default {
    components: {
        UploadFile
    },
    setup(){
        let slug = ''
        const router = useRouter()
        const route = useRoute()
        const getSlug = computed(() => {
            return route.query.id
        });

        watch(getSlug, async (id) => {
            if(id){
                slug = id;
            }else{
                // No valid slug provided
                console.log("redirect")
                // router.push('/dashboard');
            }
        }, { immediate: true })

        return {
            getSlug,
            slug
        }
    },
    data(){
        return{
            success: '',
            error: '',
            fileName: '',
            fileDescription: '',
        }
    },
        methods: {     
        beforeSend(request) {
            if(!this.fileName){
                this.error = 'Name is required'
                return
            }
            const xhr = request.formData.append('hello', 'world')
            request.formData.append('slug', this.slug)
            request.xhr.open('POST', 'http://localhost:8000/api/data/files/add')
            request.xhr.setRequestHeader('X-CSRFToken',  getCSRFToken())
            return request
        },
        onUpload(){
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
    mounted(){
        // console.log(this.slug)
    }
}

</script>

<template>
    <label>Nom : </label><br>
    <input v-model="fileName"></input><br>
    <label>Description : </label><br>
    <input v-model="fileDescription"></input><br>
    <UploadFile v-if="slug" :slug="slug" :fileName="fileName", :fileDescription="fileDescription" :multiple='false' />
    <p v-if="success">
        {{ success }}
    </p>

    <p v-if="error">
        {{ error }}
    </p>

</template>