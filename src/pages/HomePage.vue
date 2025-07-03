<script>
import { useAuthStore } from '../store/auth.js'
import { useRouter } from 'vue-router'
import { Bar } from 'vue-chartjs'


export default {
    components: {
        Bar
    },
    data(){
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: true
            }
        }
    },
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        return {
            authStore,
            router
        }
    },
    methods: {
        async logout() {
            try {
                await this.authStore.logout(this.$router)
            } catch (error) {
                console.error(error)
            }
        }
    },
    async mounted() {
        await this.authStore.fetchUser()
        console.log(import.meta.env.VITE_MY_ENV_VARIABLE)
        console.log(this.chartData)
    }
}

</script>

<template >

<h1 style="text-align: center"> Welcome to the home page </h1> 
<div v-if = "authStore.isAuthenticated" style="text-align: center">
    <p> Hi there {{ authStore.user?.username }}! </p> 
    <p> You are logged in . </p>
    <button @click ="logout"> Logout </button>
</div>
<p v-else>
    You are not logged in . 
    <router-link to="/login"> Login </router-link>
</p>

</template>