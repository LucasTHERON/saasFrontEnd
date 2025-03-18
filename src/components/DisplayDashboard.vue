
<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

import { useRouter } from 'vue-router'


export default {
    components: {
        DataTable,
        Column,
        ColumnGroup,
        Row
    },
    props: {
        projectList: Object
    },
    data(){
        return{
            metaKey: ''
        }
    },
    setup(){
        const router = useRouter()
        return {
            router
        }
    },
    methods: {
        go(){
            console.log(this.projectList)
        },
        foo(row){
            console.log(row)
        },
        goToProject(row){
            console.log("dblclick")
            let slug = row.data.slug
            console.log('go to ' + slug)
            this.$router.push('/project?id=' + slug)
        }
    },
    mounted(){
        console.log("hello")
    }
}




</script>

<template>
<h1>Hello dashboard</h1>
<button @click="go">Click</button>
<DataTable :value="projectList"
stripedRows
selectionMode="single"
tableStyle="min-width: 50rem"
@row-click="foo"
@row-dblclick="goToProject"
>
    <Column filed="id" header="" sortable></Column>
    <Column field="name" header="Name" sortable></Column>
    <Column field="created" header="Created" sortable></Column>
    <Column field="description" header="Description"></Column>
    <Column field="quantity" header="Icons"></Column>
</DataTable>


</template>

