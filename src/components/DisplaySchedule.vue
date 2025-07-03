<script>
import DataTable from 'primevue/datatable';
import Button from 'primevue/button';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import DatePicker from 'primevue/datepicker';

export default {
    components: {
        DataTable,
        Column,
        ColumnGroup,
        Row,
        Button,
        DatePicker
    },
    data() {
        return {
            tasks: [
                { "name": "Client needs definition", "phase": "Project", "state": "Done", "start": "11/15/2024", "end": "11/22/2024" },
                { "name": "Architectural feasibility study", "phase": "Project", "state": "Done", "start": "11/25/2024", "end": "12/10/2024" },
                { "name": "Obtaining the building permit", "phase": "Project", "state": "Ongoing", "start": "12/11/2024", "end": "02/15/2025" },
                { "name": "Selection of construction companies", "phase": "Project", "state": "To Do", "start": "02/16/2025", "end": "02/28/2025" },
                { "name": "Site preparation (earthworks)", "phase": "Construction", "state": "Done", "start": "03/01/2025", "end": "03/15/2025" },
                { "name": "Foundations", "phase": "Construction", "state": "Done", "start": "03/17/2025", "end": "03/31/2025" },
                { "name": "Erection of load-bearing walls", "phase": "Construction", "state": "Ongoing", "start": "04/02/2025", "end": "05/15/2025" },
                { "name": "Roof installation", "phase": "Construction", "state": "To Do", "start": "05/16/2025", "end": "05/30/2025" },
                { "name": "Exterior joinery (windows, doors)", "phase": "Construction", "state": "Blocked", "start": "06/01/2025", "end": "06/15/2025" },
                { "name": "Thermal insulation work", "phase": "Construction", "state": "To Do", "start": "06/16/2025", "end": "06/30/2025" },
                { "name": "Electrical installation", "phase": "Construction", "state": "To Do", "start": "07/01/2025", "end": "07/15/2025" },
                { "name": "Plumbing and sanitary fixtures", "phase": "Construction", "state": "To Do", "start": "07/16/2025", "end": "07/31/2025" },
                { "name": "Floor coverings", "phase": "Construction", "state": "To Do", "start": "08/01/2025", "end": "08/15/2025" },
                { "name": "Painting and finishing", "phase": "Construction", "state": "To Do", "start": "08/16/2025", "end": "08/31/2025" },
                { "name": "End-of-construction cleaning", "phase": "Construction", "state": "To Do", "start": "09/01/2025", "end": "09/07/2025" },
                { "name": "Work handover", "phase": "Operation", "state": "Planned", "start": "09/08/2025", "end": "09/15/2025" },
                { "name": "Equipment commissioning", "phase": "Operation", "state": "Planned", "start": "09/16/2025", "end": "09/23/2025" },
                { "name": "Energy performance monitoring", "phase": "Operation", "state": "Ongoing", "start": "09/24/2025", "end": null },
                { "name": "Preventive maintenance of installations", "phase": "Operation", "state": "Scheduled", "start": "10/01/2025", "end": null },
                { "name": "Management of operational waste", "phase": "Operation", "state": "Ongoing", "start": "10/01/2025", "end": null },
                { "name": "Potential improvements (phase 1)", "phase": "Operation", "state": "Planned", "start": "03/01/2026", "end": "04/30/2026" }
            ],
            date: "17/12/1995"
        }
    },
};
</script>

<template>
        <DataTable :value="tasks" tableStyle="min-width: 50rem">
            <Column header="Name" sortable>
                <template #body="row">
                    <span>{{  row.data.name }}</span>        
                </template>
            </Column>
            <Column header="Phase" sortable>
                <template #body="row">
                    <span :class="row.data.phase">{{  row.data.phase }}</span>            
                </template>
            </Column>
            <Column header="State" sortable>
                <template #body="row">
                    <span :class="row.data.state">{{  row.data.state }}</span>            
                </template>
            </Column>
            <Column header="Start" sortable>
                <template #body="row">
                    <span>{{  row.data.start }}</span>        
                </template>
            </Column>
            <Column header="End" sortable>
                <template #body="row">
                    <span v-if="row.data.end">{{  row.data.end }}</span>        
                    <span v-else="row.data.end">-</span>        
                </template>
            </Column>
        </DataTable>
</template>

<style scoped>
span{
    padding: 2px 8px;
    border-radius: 15px;
}

.Project, .To, .Scheduled{
    background-color: rgb(197, 222, 242);
    font-weight: 500;
    color: rgb(42, 122, 187);
}

.Construction, .Ongoing{
    background-color: rgb(242, 230, 197);
    font-weight: 500;
    color: rgb(179, 159, 47);
}

.Planned{
    background-color: rgb(255, 205, 179);
    font-weight: 500;
    color: rgb(231, 102, 28);
}

.Blocked{
    background-color: rgb(242, 197, 197);
    font-weight: 500;
    color: rgb(228, 63, 63);
}

.Operation, .Done{
    background-color: rgb(201, 242, 197);
    font-weight: 500;
    color: rgb(49, 187, 42);
}

</style>