import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import ConnectionPlugin from './plugins/connectionPlugin'
import Index from './components/Index.vue'
import Orderbook from './components/Orderbook.vue'
import Statements from './components/Statements.vue'
import './main.css'

const pinia = createPinia()

const routes = [
  { path: '/', component: Index },
  { path: '/orderbook', component: Orderbook },
  { path: '/statements', component: Statements },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(ConnectionPlugin).use(pinia).use(router).mount('#app')
