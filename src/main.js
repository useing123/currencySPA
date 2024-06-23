import { createApp } from 'vue'
import App from './App.vue'
import { installPinia } from './pinia'

const app = createApp(App)

installPinia(app)

app.mount('#app')
