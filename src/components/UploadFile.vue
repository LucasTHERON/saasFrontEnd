<script>
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCSRFToken, useAuthStore } from '../store/auth'

import FileUpload from 'primevue/fileupload';
import SelectButton from 'primevue/selectbutton';



export default {
    props: {
        slug : '',
        fileName: '',
        fileDescription: ''
    },
    components: {
        FileUpload,
        SelectButton,
    },
    data(){
        return{
            name: '',
            error: '',
            success: '',
            extracted_data: '',
            imported_file: 'aa',
            options: ['Document', 'Plan'],
            value:'Document',
            nodes: [],
            dataDepth: 0,
            depthStep: computed(() => { if(this.dataDepth == 0){
                    return 0;
                }else{
                    return 50 / this.dataDepth;
                }
            }),
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
    mounted() {
        console.log(getCSRFToken())
        console.log(getCSRFToken())
    }
}
</script>
<template>

<SelectButton v-model="value" :options="options" />


<div style="border: 1px solid grey; padding: 20px 30px; min-height: 300px">
    <h1> AJOUTER FILE </h1>
    <h4>{{ value }}</h4>
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
    <h1>{{ fileName }}</h1>
    <h1>{{ fileDescription }}</h1>
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