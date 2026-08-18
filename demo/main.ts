import { createApp } from 'vue'
import App from './App.vue'
import GeckouVueUi from '@/index'
import './styles/base.scss'

const app = createApp(App)
app.use(GeckouVueUi)
app.mount('#app')
