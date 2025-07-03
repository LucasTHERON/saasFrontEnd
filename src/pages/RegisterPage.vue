<template >
<div>
    <h2>Register</h2> 
    <div style="margin: auto; width: 360px;" class="card flex justify-center">
        <Toast />

        <Form v-slot="$form" :initialValues="initialValues" :validateOnValueUpdate="false" :validateOnBlur="true" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
            <div style="margin-bottom: 1rem;">
                <InputText name="last_name" v-model="last_name" type="text" placeholder="Lastname" :invalid="fieldError.last_name" fluid />
            </div>
            <div style="margin-bottom: 1rem;">
                <InputText name="first_name" v-model="first_name" type="text" placeholder="FirstName" :invalid="fieldError.first_name" fluid />
            </div>
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


</template>

<script>
import { getCSRFToken } from '../store/auth'
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
    data() {
        return {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            error: '',
            fieldError: {
                'last_name': false,
                'first_name': false,
                'email': false,
                'password': false
            },
            success: '',
            initialValues: {
                email: ''
            },
        }
    },
    setup(){
        const toast = useToast();
        return{
            toast,
        }
    },
    methods: {
        async register() {
            try {
                const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()
                    },
                    body: JSON.stringify({
                        last_name: this.last_name,
                        first_name: this.first_name,
                        email: this.email,
                        password: this.password
                    }),
                    credentials: 'include'
                })
                const data = await response.json()
                if (response.ok) {
                    this.success = 'Registration successful! Please log in.'
                    this.toast.add({ severity: 'success', summary: 'Registration successful!', life: 3000 });
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 1000)
                } else {
                    this.error = data.error || 'Registration failed'
                }
            } catch (err) {
                this.error = 'An error occurred during registration: ' + err
            }
        },
        onFormSubmit() {
            this.error = ''
            if(!this.last_name){ this.fieldError.last_name = true }else{ this.fieldError.last_name = false }
            if(!this.first_name){ this.fieldError.first_name = true }else{ this.fieldError.first_name = false }
            if(!this.email){ this.fieldError.email = true }else{ this.fieldError.email = false }
            if(!this.password){ this.fieldError.password = true }else{ this.fieldError.password = false }

            const specialChars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.\/?~ ]/;
            if(this.fieldError.last_name == false && this.fieldError.first_name == false && this.fieldError.email == false && this.fieldError.password == false){
                if(this.password.length < 12 || !/[A-Z]/.test(this.password) || !/[a-z]/.test(this.password) || !specialChars.test(this.password) || !/\d/.test(this.password)){
                    this.error = "Password should be at least 12 characters, contain one uppercase, one lowercase character, one number and one symbol character";
                }else{
                    this.error = ''
                    this.register()
                }
            }else{
                this.error = "Some fields are empty";
            }
        }
    },
    mounted() {
        // import.meta.env.VITE_API_BASE_URL
        console.log(import.meta.env.VITE_API_BASE_URL + 'register');
    }
}
</script>