import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css' // Using the default Vite CSS. Replace with your own global styles.
import 'primeicons/primeicons.css'
import router from './router'
import App from './App.vue'
import { useAuthStore } from './store/auth'
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';

const app = createApp(App)

//Primvue: si on défini une variable dans semantic en camelCase, on peut la réutiliser sous la forme camel.case
const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{emerald.50}',
            100: '{emerald.100}',
            200: '{emerald.200}',
            300: '{emerald.300}',
            400: '{emerald.400}',
            500: '{emerald.500}',
            600: '{emerald.600}',
            700: '{emerald.700}',
            800: '{emerald.800}',
            900: '{emerald.900}',
            950: '{emerald.950}'
        },
        formField: {
            paddingX: '1rem',
            paddingY: '1rem',
        },
        colorScheme: {
            light: {
                formField: {
                    hoverBorderColer: '{primary.color}'
                }
            },
            dark: {
                formField: {
                    hoverBorderColer: '{primary.color}'
                },
                surface: {
                    0: '#ffffff',
                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            }
        },
    },
    components: {
        button: {
            paddingX: '0.75rem',
            paddingY: '0.5rem',
        },
        menubar: {
            item: {
                focus: {
                    background: null,
                    color: '{emerald.600}'
                },
                icon: {
                    color: null,
                    focus: {
                        color: '{emerald.600}'
                    }
                }
            },
            justifyContent: 'center',
        }
    },
});


app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.my-app-dark'
        }
    }
});


app.use(createPinia())
app.use(router)

app.use(ToastService);

const authStore = useAuthStore()
authStore.setCsrfToken()

app.mount('#app')