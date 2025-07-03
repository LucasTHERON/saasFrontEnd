<script>
export default {
    props: {
        document
    },
    data(){
        return{
        }
    },
    methods: {
    },
    mounted(){
        console.log(this.document)
    }
}
</script>

<template>
<div class="preview-document">
    <h3>{{  document.name }}</h3>
    <p style="line-height: 1em; font-size: 12px; margin-top: 0; font-weight: 100">{{ document.created }}</p>
    <div v-if="document.extension == 'jpg'" class="file-img">
        .{{  document.extension }}
    </div>
    <div v-else class="file-img">
        .{{  document.extension }}
    </div>
    <p v-if="document.description.length > 70">{{ document.description.slice(0,70) }}...</p>
    <p v-else>{{ document.description }}</p>
    <a :href="'project/file/data?id=' + document.slug">Ouvrir le document</a>
</div>
</template>

<style scoped>
h3{
 font-size: 29px;
 margin: 0;
}

.preview-document{
    width: 275px;
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 20px 25px;
    border: solid 1px black;
    background-color: white;
}

.file-img{
    margin: auto;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    padding: 50px 5px;
    border: 2px solid rgba(0, 0, 0,1);
    border-radius: 30px 0 0 0;
}

a{
    text-align: center;
    display: block;
    color: white;
    border: solid #10b981 1px;
    border-radius: 4px;
    padding: 8px 5px;
    background-color: #10b981;
    font-weight: 500;
    text-decoration: none;
}
</style>