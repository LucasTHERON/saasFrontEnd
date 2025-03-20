<script>
import { useRouter } from 'vue-router'
import { getCSRFToken } from '../../store/auth'
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

export default {
    components: {
        Button,
        InputText
    },
    data(){
        return{
            name: '',
            city: '',
            postcode: '',
            direction: '',
            description: '',
            success: '',
            error: ''
        }
    },
    methods: {
        async addBuilding() {
            if(!this.name){
                console.error('Il faut ajouter un nom');
                return;
            }
            try {
                const response = await fetch('http://localhost:8000/api/data/projects/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: JSON.stringify({
                        name: this.name,
                        city: this.city,
                        postcode: this.postcode,
                        direction: this.direction,
                        description: this.description,
                    }),
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    this.success = 'Le bat a bien été ajouté'
                    setTimeout(() => {
                        this.$router.push('/dashboard')
                    }, 1000)
                } else {
                    this.error = data.error || 'Echec'
                }
            } catch (err) {
                this.error = 'Il y a eu une erreur ' + err
            }
        }
    },
}

</script>

<template>
<h2>Créer un projet</h2>


<InputText name="name" v-model="name" type="text" placeholder="Name" :invalid="false" fluid />

<label>city :</label>
<input v-model="city" />
<label>postcode :</label>
<input v-model="postcode" />
<label>direction :</label>
<input v-model="direction" />
<label>description :</label>
<textarea v-model="description" />

<Button @click="addBuilding" label="Add" />
<p v-if="success">
    {{ success }}
</p>

<p v-if="error">
    {{ error }}
</p>

</template>