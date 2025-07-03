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
        extractedData: null
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
            mynode: {
            "name": "Racine",
            "children": [
                {
                "name": "Nœud A",
                "value": 42,
                "children": [
                    {
                    "name": "Feuille A1",
                    "value": 15
                    },
                    {
                    "name": "Feuille A2",
                    "value": 28
                    }
                ]
                },
                {
                "name": "Nœud B",
                "value": 77,
                "children": [
                    {
                    "name": "Feuille B1",
                    "value": 5
                    },
                    {
                    "name": "Feuille B2",
                    "value": 91
                    },
                    {
                    "name": "Feuille B3",
                    "value": 33
                    }
                ]
                },
                {
                "name": "Feuille C",
                "value": 60
                }
            ]
            },
            prettyDataArray: null
        }
    },
    setup(){
    },
    methods: {
        prepareData(){
            this.extractedData.forEach( obj => {
                let array = []
                for (const [key, value] of Object.entries(obj)) {
                    //name value type count
                    let newObject = {}
                    newObject.key = key;
                
                    console.log("pour " + key)
                    if(value && value.length >> 0){
                        console.log("value : " + value)
                        newObject.value = value
                    }else{
                        newObject.value = "-"
                    }
                    newObject.type = typeof(value);
                    newObject.count = 0;
                    array.push(newObject)
                    console.log(newObject)
                    // console.log("name : " + key)
                    // console.log("value : " + value.toString())
                    // console.log("type : " + typeof(value))
                    // if(typeof(value) == "Array"){
                    //    console.log("count : " + value.length)
                    // }else{
                    //    console.log("count : 1")
                    // }
                }
                this.dataArray.push(array)
            })
            console.log(typeof(this.dataArray))
            this.prettyDataArray = JSON.stringify(this.dataArray)
            console.log(this.prettyDataArray)
            let prettyNode = JSON.stringify(this.mynode)
            console.log(prettyNode)
        },
        logExtractedData(){
            console.log(this.extractedData)
            console.log("_____")
    
            console.log(this.dataArray)
        },
        displayExtractedData(){
            const extractedDataDiv = document.querySelector("#extractedData");
        },

    },
    mounted() {
        this.prepareData()
        console.log(this.mynode)
        console.log(typeof(this.mynode))
        // this.setEvents()

            // <DataTable :value="customers" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
            //         paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            //         currentPageReportTemplate="{first} to {last} of {totalRecords}">
            //     <template #paginatorstart>
            //         <Button type="button" icon="pi pi-refresh" text />
            //     </template>
            //     <template #paginatorend>
            //         <Button type="button" icon="pi pi-download" text />
            //     </template>
            //     <Column field="name" header="Name" style="width: 25%"></Column>
            //     <Column field="country.name" header="Country" style="width: 25%"></Column>
            //     <Column field="company" header="Company" style="width: 25%"></Column>
            //     <Column field="representative.name" header="Representative" style="width: 25%"></Column>
            // </DataTable>
    }
}
console.log('a')
</script>

<template>

<div style="border: 1px solid grey; padding: 20px 30px;">
    <button @click="logExtractedData">Log extracted data</button>
    <div v-for="array in mynode">
        <div>-</div>
        <div>{{  array }}</div>
    </div>

    <div v-for="object in dataArray" class="card">
        <DataTable size="small" :value="object" tableStyle="min-width: 50rem" showGridlines >
            <Column field="key" header="Name"></Column>
            <Column field="value" header="Value"></Column>
            <Column field="type" header="Type"></Column>
            <Column field="count" header="Count"></Column>
        </DataTable>
    </div>

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