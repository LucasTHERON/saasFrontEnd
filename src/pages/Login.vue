<template>

<div v-if="forceBrutLevel < 15">
    <h2>Login</h2> 
    <div style="margin: auto; width: 360px;" class="card flex justify-center">
        <Toast />

        <Form v-slot="$form" :initialValues="initialValues" :validateOnValueUpdate="false" :validateOnBlur="true" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
            <div style="margin-bottom: 1rem;">
                <InputText name="email" v-model="email" type="email" placeholder="Email" :invalid="fieldError.email" fluid />
            </div>
            <div style="margin-bottom: 1rem;">
                <InputText name="password" v-model="password" type="password" placeholder="Password" :invalid="fieldError.password" fluid />
            </div>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
    </div>
    <p v-if="error" class="error">{{ error }}</p> 
    <p v-if="success" class="success">{{ success }}</p>
</div>
<div v-else>
    <h2>Too many login attempts</h2>
</div>



</template>

<script>
import { useAuthStore } from '../store/auth'
import { Form } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';

export default {
    components: {
        Form,
        InputText,
        Button,
        Toast
    },
    setup() {
        const authStore = useAuthStore()
        const toast = useToast();
        return {
            authStore,
            toast
        }
    },
    data() {
        return {
            email: "",
            password: "",
            error: "",
            succes: "",
            fieldError: {
                'email': false,
                'password': false
            },
            initialValues: {
                email: ''
            },
            forceBrutLevel: 0
        }
    },
    methods: {
        async login() {
            await this.authStore.login(this.email, this.password, this.$router)
            if (!this.authStore.isAuthenticated) {
                this.toast.add({ severity: 'error', summary: 'Une erreur est survenue!', life: 3000 });
                this.forceBrutLevel++
            }
        },
        onFormSubmit() {
            this.error = ''
            if(!this.email){
                this.fieldError.email = true
            }else{ 
                this.fieldError.email = false
            }
            if(!this.password){
                this.fieldError.password = true
            }else{ 
                this.fieldError.password = false
            }
            if(this.fieldError.email == false && this.fieldError.password == false){
                this.error = ''
                this.login()
            }else{
                this.error = "Some fields are empty";
            }
        }
    }
}

</script>
