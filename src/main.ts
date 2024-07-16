import { createApp } from 'vue'
import App from './App.vue'
import VueFormComponents from './index'

const app = createApp(App)
app.use(VueFormComponents)
app.mount('#app')