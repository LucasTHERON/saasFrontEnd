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
        async addProject() {
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
                        this.$router.push('/project/data/update?slug=' + data.slug)
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

<Toast />

<Form v-slot="$form" :initialValues="initialValues" :validateOnValueUpdate="false" :validateOnBlur="true" class="flex flex-col gap-4 w-full sm:w-56">
    <div style="margin-bottom: 1rem;">
        <InputText name="name" v-model="name" type="text" placeholder="Name"fluid />
    </div>
    <div style="margin-bottom: 1rem;">
        <InputText name="city" v-model="city" type="text" placeholder="City"fluid />
    </div>
        <div style="margin-bottom: 1rem;">
        <InputText name="postcode" v-model="postcode" type="text" placeholder="Postcode"fluid />
    </div>
        <div style="margin-bottom: 1rem;">
        <InputText name="direction" v-model="direction" type="text" placeholder="Direction"fluid />
    </div>
    <div style="margin-bottom: 1rem;">
        <InputText name="description" v-model="description" type="text" placeholder="Description"fluid />
    </div>
    <Button @click="addProject" label="Add project" />
</Form>

<p v-if="success">
    {{ success }}
</p>

<p v-if="error">
    {{ error }}
</p>

</template>