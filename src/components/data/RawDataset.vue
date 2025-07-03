<script>
import { computed, ref, watch } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional


export default {
    components: {
        DataTable,
        Column,
        ColumnGroup,
        Row
    },
    props: {
        dataset: null
    },
    data(){
        return{
            name: '',
            error: '',
            success: '',
            imported_file: 'aa',
            dataDepth: 0,
            dataIndex: 0,
            dataArray: [],
        }
    },
    setup(){
    },
    methods: {
        logExtractedData(){
            console.log(this.dataset)
        }
    },
    mounted() {    
        console.log(this.dataset)
    }
}
</script>

<template>

<div style="border: 1px solid grey; padding: 20px 30px;">
    <button @click="logExtractedData">Log data</button>
    <h1>Raw dataset</h1>

    <DataTable size="small" :value="dataset" tableStyle="min-width: 50rem" showGridlines >
        <Column field="key" header="Name"></Column>
        <Column field="value" header="Value"></Column>
        <Column field="type" header="Type"></Column>
        <Column field="category" header="Category"></Column>
    </DataTable>
    <!-- <div v-for="object in dataset" class="card">
        <DataTable size="small" :value="object" tableStyle="min-width: 50rem" showGridlines >
            <Column field="key" header="Name"></Column>
            <Column field="value" header="Value"></Column>
            <Column field="type" header="Type"></Column>
            <Column field="category" header="Category"></Column>
        </DataTable>
    </div> -->

    <p v-if="success">
        {{ success }}
    </p>

    <p v-if="error">
        {{ error }}
    </p>
</div>


</template>

<style>
#extractedData{
    text-align: left;
    overflow: hidden;
    font-size: 14px;
}

#extractedData .wrapper{
    width: fit-content;
}

#extractedData .wrapper div{
    padding: 2px 10px;
    font-weight: 200;
}

#extractedData .hasData{
    text-align: left;
    width: fit-content;
}

#extractedData .wrapper .key{
    border-bottom: 1px solid #272727;
    font-weight: 600;
    text-transform: capitalize;
}

#extractedData .wrapper div{
    
}


#extractedData .hasData{
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Standard */
}



#extractedData .hasData:hover{
    cursor: pointer;
}

.isRed{color: red;}
.isBlue{color: blue;}

.dataNode .key{
    font-weight: 500;
    text-transform: capitalize;
}

.dataNode .value{
    font-weight: 200
}

.uploadSection .p-fileupload-content{
    min-height: 450px;
}

tbody td {
    padding: 2px 8px !important;
}
</style>