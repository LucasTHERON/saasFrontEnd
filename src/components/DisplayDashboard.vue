
<script>
import DataTable from 'primevue/datatable';

import Button from 'primevue/button';
import Card from 'primevue/card';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import SelectButton from 'primevue/selectbutton';



import { useRouter } from 'vue-router'


export default {
    components: {
        DataTable,
        Button,
        Card,
        Column,
        ColumnGroup,
        Row,
        SelectButton
    },
    props: {
        projectList: Object,
        user: Object
    },
    data(){
        return{
            metaKey: '',
            options: ['Table', 'Card'],
            display: 'Table',
        }
    },
    setup(){
        const router = useRouter()
        return {
            router
        }
    },
    methods: {
        selectProject(row){
            console.log(row)
            console.log(typeof(row.data.id))
        },
        goToProject(row){
            if(this.display == 'Table'){
                let slug = row.data.slug
                console.log('go to ' + slug)
                this.$router.push('/project?id=' + slug)
            }else if(this.display == 'Card'){
                // let slug = row.data.slug
                slug = row
                console.log('go to ' + slug)
            }else{
                return;
            }

        }
    },
    mounted(){
        console.log(this.user)
    }
}




</script>

<template>

<SelectButton v-model="display" :options="options" />
<h2>{{ display }}</h2>

<DataTable v-if="display == 'Table'" :value="projectList"
stripedRows
selectionMode="single"
tableStyle="min-width: 50rem"
@row-click="selectProject"
@row-dblclick="goToProject"
>
    <Column filed="id" header="" sortable></Column>
    <Column field="name" header="Name" sortable></Column>
    <Column field="created" header="Created" sortable></Column>
    <Column field="description" header="Description"></Column>
    <Column field="quantity" header="Icons"></Column>
</DataTable>

<div v-if="display == 'Card'" class="card-container">
    <Card v-for="project in projectList" style="overflow: hidden">
        <template #header>
            <img alt="header" src="../assets/vue.svg" style="width: 100%;
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
</div>




</template>

<style scoped>
.card-container{
    display: grid;
    padding: 10px;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px;
}

.button-custom{
    width: fit-content;
    padding: 0.5rem 1rem;
    display: block;
}

.button-container{
    display: flex;
    justify-content: center;
}

.button-custom.secondary{
    color: #f8fafc
}
</style>

