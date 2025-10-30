import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { Icon } from '@iconify/vue'

import './assets/style.css'

const app = createApp(App)

app.use(createPinia())
app.component('Icon', Icon)
app.use(router)

app.mount('#app')
