import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import App from './App.vue'
import 'primeicons/primeicons.css'
import './assets/style.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.mount('#app')
