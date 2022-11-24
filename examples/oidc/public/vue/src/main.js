import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

export const app = createApp(App)

app.config.productionTip = false

app.use(router)

app.mount('#app')
