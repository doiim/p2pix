import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ConnectionPlugin from './plugins/connectionPlugin'
import './main.css'

const pinia = createPinia()

createApp(App).use(ConnectionPlugin).use(pinia).mount('#app')
