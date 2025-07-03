
<script>
import DataTable from 'primevue/datatable';

import Button from 'primevue/button';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import SelectButton from 'primevue/selectbutton';
import InputText from 'primevue/inputtext';


export default {
    components: {
        DataTable,
        Button,
        Column,
        ColumnGroup,
        InputText,
        Row,
        SelectButton
    },
    props: {
        teamList: [],
    },
    data(){
        return{
            metaKey: '',
            editingRows: [],
        }
    },
    methods: {
        selectProject(row){
            console.log(row)
            console.log(typeof(row.data.id))
        },
        removeElement(index){
            this.teamList.splice(index, 1)
            this.UpdateTeam()
        },
        UpdateTeam(){
            this.$emit('update-team', this.teamList)
        },
        onRowEditSave(event) {
            let { newData, index } = event;
            this.teamList[index] = newData;
            this.UpdateTeam()
        },

    },
}

</script>

<template>
<DataTable :value="teamList"
@row-click="clickEvent"
stripedRows
selectionMode="single"
tableStyle="min-width: 50rem"
editMode="row"
v-model:editingRows="editingRows"
@row-edit-save="onRowEditSave"
>
    <Column field="name" header="Name" sortable>
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
        </template>
    </Column>
    <Column field="firstname" header="Firstname" sortable>
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
        </template>
    </Column>
    <Column field="role" header="Role" sortable>
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
        </template>
    </Column>
    <Column field="team" header="Team" sortable>
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
        </template>
    </Column>
    <Column field="email" header="Email" sortable>
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
        </template>
    </Column>
    <Column field="phone" header="Phone" sortable>
        <template #editor="{ data, field }">
            <InputText v-model="data[field]" fluid />
        </template>
    </Column>
    <Column style="width: 25px; max-width: 10%;" bodyStyle="text-align:center">
        <template #body="row">
            <i @click="() => { removeElement(row.index) }" class="pi pi-ban"></i>
        </template>
        <template #editor="{ data, field }">

        </template>
    </Column>
    <Column :rowEditor="true" style="width: 8rem; max-width: 10%;" bodyStyle="text-align:center"></Column>
</DataTable>


</template>

<style scoped>
</style>