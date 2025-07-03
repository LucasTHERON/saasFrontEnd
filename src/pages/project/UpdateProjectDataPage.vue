<script>
import { computed, ref, reactive, watch } from 'vue'
import { getCSRFToken, useAuthStore } from '../../store/auth.js'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';

import DisplayTeam from '../../components/DisplayTeam.vue';
import DisplaySchedule from '../../components/DisplaySchedule.vue';


export default {
    components: {
        Button,
        InputText,
        Menu,

        DisplayTeam,
        DisplaySchedule
    },
    data(){
        return{
            dataHasChanged: false,
            date: "",
            teamListTest: [
                {                    
                    name: 'Lucas',
                    firstname: 'Lucas',
                    role: 'aaa',
                    team: 'aaaaa',
                    email: 'a',
                    phone: 'a', 
                },
                {
                    name: 'Bernard',
                    firstname: 'Bernard',
                    role: 'rt()',
                    team: 'erzfefsd',
                    email: 'aaaaaaaaaaa',
                    phone: 'dccef', 
                },
                {                    
                    name: 'Charles',
                    firstname: 'Charles',
                    role: 'eee',
                    team: 'eee',
                    email: 'e',
                    phone: 'eee', 
                },
            ],
            team: {
                name: "", 
                firstname: "",
                role: "",
                team: "",
                email: "",
                phone: "",
            },
            menuItems: [
                {
                    label: 'Sections',
                    items: [
                        {
                            label: 'Human ressources',
                            icon: 'pi pi-users',
                            url: '#team-form'
                        },
                        {
                            label: 'Schedule',
                            icon: 'pi pi-clock',
                            url: '#schedule'
                        },
                        {
                            label: 'Search',
                            icon: 'pi pi-search'
                        }
                    ]
                },
            ]
        }
    },
    setup() {
        let slug = ''
        let teamList = reactive([])
        let projectData = reactive({
        });
        const authStore = useAuthStore()
        const router = useRouter()
        const route = useRoute()
        const getSlug = computed(() => {
            return route.query.id
        });

        async function getAuth(slug){
            const response = await fetch('http://localhost:8000/api/data/projects/auth/admin/project?id=' + slug, {
                    method: 'GET',
                    credentials: 'include',
                })
            if(response.status !== 200){
                if(response.status >= 400){
                    console.error('Forbidden')
                    console.log("redirect")
                    // router.push('/dashboard');
                }
            }else{
                const data = await response.json()
                const decodedData = JSON.parse(data.data)
                if(decodedData){
                    Object.assign(projectData, decodedData);
                }
                if(decodedData.auth !== true){
                    console.log('redirect');
                }
                return decodedData.auth
            }
        }

        async function getData(slug){
            const response = await fetch('http://localhost:8000/api/data/projects/data/get?slug=' + slug, {
                    method: 'GET',
                    credentials: 'include',
                })
            if(response.status !== 200){
                if(response.status >= 400){
                    console.error('Forbidden')
                    console.log("redirect")
                    // router.push('/dashboard');
                }
            }else{
                const data = await response.json()
                const decodedData = JSON.parse(data.data)

                console.log(decodedData)
                console.log(decodedData.team)
                console.log(JSON.parse(decodedData.team))
                return decodedData
            }
        }

        watch(getSlug, async (id) => {
            if(id){
                try {
                    slug = id.replace(' ','');
                    slug = slug.replace('/','');
                    const auth = await getAuth(slug);
                    if(!auth){
                        console.log("redirect");
                        
                    }
                    const data = await getData(slug);
                    let teamData = JSON.parse(data.team);
                    console.log(teamData)

                    for (const [id, object] of Object.entries(teamData)) {
                        teamList.push(object)
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
                
            }else{
                // No valid slug provided
                console.log("redirect")
                // router.push('/dashboard');
            }
        }, { immediate: true })

        return {
            authStore,
            projectData,
            getSlug,
            slug,
            teamList
        }
    },
    methods: {
        addTeamMember(){
            if(!this.team.name){
                console.error('Il faut ajouter un nom');
                return;
            }
            let newTeamate = {
                name: this.team.name ,
                firstname: this.team.firstname ,
                role: this.team.role ,
                team: this.team.team ,
                email: this.team.email ,
                phone: this.team.phone ,
            }
            this.teamList.push(newTeamate)

            this.team = {
                name: "",
                firstname: "",
                role: "",
                team: "",
                email: "",
                phone: "",
            }
            this.dataHasChanged = true
        },
        updateTeam(teamList){
            this.teamList = teamList
            this.dataHasChanged = true
        },
        async saveData(){
            if(!this.dataHasChanged){
                console.error('Il faut ajouter un nom');
                return;
            }
            try {
                // http://localhost:8000/api/data/projects/data/update
                
                const response = await fetch('http://localhost:8000/api/data/projects/data/update', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: JSON.stringify({
                        data: {
                            team: this.teamList
                        },
                        slug: this.slug
                    }),
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    console.log('added')
                } else {
                    console.log('not')
                }
            } catch (err) {
                this.error = 'Il y a eu une erreur ' + err
            }
        }
    },
}
</script>

<template>

<div class="page-options">
    <div class="card flex justify-center sections-menu">
        <Menu :model="menuItems" />
    </div>
    <div class="save-button-container">
        <Button style="display: inline-block;" severity="secondary" v-if="dataHasChanged" @click="saveData" label="Save project data" />
        <Button style="display: inline-block;" severity="secondary" v-else @click="saveData" label="Save data" disabled/>
        <Button style="display: inline-block; margin-left: 1.5rem;" @click="" label="Go to project" />
    </div>
</div>

<h1>Project Main configuration</h1>
<br>
<br>
<br>
<br>

<h2>Human ressources</h2>
<Form v-slot="$form" :initialValues="initialValues" :validateOnValueUpdate="false" :validateOnBlur="true" class="flex gap-4 w-full sm:w-56" id="team-form">
    <InputText name="name" v-model="team.name" type="text" placeholder="Name"fluid />
    <InputText name="firstname" v-model="team.firstname" type="text" placeholder="Firstname"fluid />
    <InputText name="role" v-model="team.role" type="text" placeholder="Role"fluid />
    <InputText name="postcode" v-model="team.team" type="text" placeholder="Team"fluid />
    <InputText name="direction" v-model="team.email" type="text" placeholder="Email"fluid />
    <InputText name="description" v-model="team.phone" type="text" placeholder="Phone"fluid />
    <Button @click="addTeamMember" label="+" style="font-size: 1.2rem" />
</Form>
<br>
<div>
    <DisplayTeam v-if="teamList" :teamList="teamList" @remove-member="removeTeamMember" @update-team="updateTeam"/>
</div>

<h2>Schedule</h2>
<DisplaySchedule v-if="teamList" :teamList="teamList" @remove-member="removeTeamMember" @update-team="updateTeam" id="schedule"/>

<br><br><br><br><br>

</template>

<style scoped>
.page-options{
    position: fixed;
    z-index: 15;
    top: 0;
    height: 100vh;
    width: fit-content;
    right: 0
}

.sections-menu{
    position: absolute;
    top: 60px;
    width: fit-content;
    right: 30px;
}

.save-button-container{
    position: absolute;
    padding: 20px;
    text-align: right;
    width: 350px;
    bottom: 30px;
    right: 30px;
}

#team-form{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 50px;
    grid-gap: 0.5rem;
}

</style>