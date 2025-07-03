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
        // dataset: null,

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
            sample: {
                "title": "Évolution annuelle du marché des Glouks par région (2021-2025)",
                "type": "table",
                "columns": ["Année", "Europe", "Amérique du Nord", "Asie-Pacifique", "Amérique Latine", "Afrique"],
                "rows": [
                    ["2021", 6.66, 8.81, 7.79, 9.36, 3.88],
                    ["2022", 9.24, 7.08, 6.36, 3.47, 3.16],
                    ["2023", 2.53, 2.88, 9.12, 6.71, 4.66],
                    ["2024", 7.6, 5.87, 3.7, 2.35, 2.9],
                    ["2025", 6.86, 9.12, 5.58, 4.83, 6.73]
                ]
            },
            data: null
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
        console.log(this.sample.title)
        let columns = this.sample.columns
        let rows = this.sample.rows
        let newArray = {}
        console.log("-----------")
        console.log("-----------")
        console.log("-----------")
        rows.forEach((el, i) => {
            // console.log(columns)
            // console.log(el)
            let obj = {}
            columns.forEach((col, i) => {
                console.log(col + " : " + el[i])
                obj[col] = el[i]
            })
            console.log("OBJECT")
            console.log(obj)
            console.log("OBJECT")
            newArray[i] = obj
        })
        console.log("-----------")
        console.log("-----------")
        console.log("-----------")
        console.log(newArray)
        this.data = newArray
        // let data = [

        // ]
        // let newArray = {}
        // data.forEach((el, i) => {
        //     newArray[i] = el
        // })
        // this.rawData = newArray
        // console.log(this.rawData)
    }
}
</script>

<template>

<div style="border: 1px solid grey; padding: 20px 30px;">
    <button @click="logExtractedData">Log data</button>
    <h1>Double entry dataset</h1>
    <h2>{{ sample.title }}</h2>
    <DataTable size="small" :value="data" tableStyle="min-width: 50rem" showGridlines >
        <Column style="font-weight: bold" field="Année" header="Année" sortable></Column>
        <Column field="Afrique" header="Afrique" sortable></Column>
        <Column field="Amérique du Nord" header="Amérique du Nord" sortable></Column>
        <Column field="Amérique Latine" header="Amérique Latine" sortable></Column>
        <Column field="Asie-Pacifique" header="Asie-Pacifique" sortable></Column>
        <Column field="Europe" header="Europe" sortable></Column>
    </DataTable>

    <!-- <DataTable size="small" :value="sample" tableStyle="min-width: 50rem" showGridlines >
        <Column field="key" header="Name"></Column>
        <Column field="value" header="Value"></Column>
        <Column field="type" header="Type"></Column>
        <Column field="category" header="Category"></Column>
    </DataTable> -->
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