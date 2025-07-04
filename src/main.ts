import Aura from '@primeuix/themes/aura'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Password from 'primevue/password'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import { createApp } from 'vue'
import App from './App.vue'
import 'primeicons/primeicons.css'
import './assets/style.less'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.component('Button', Button)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Select', Select)
app.component('Textarea', Textarea)
app.component('Message', Message)

app.mount('#app')
