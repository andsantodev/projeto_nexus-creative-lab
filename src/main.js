import { createApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from '@/router'
import '@/styles/fonts.css'
import '@/styles/tokens.css'
import '@/assets/base.css'

const app = createApp(App)
const router = createAppRouter()

router.afterEach((to) => {
  document.title = to.meta?.title ?? 'NEXUS Creative Lab'
})

app.use(router)
app.mount('#app')