import { createApp } from 'vue'
import { createGmapVuePlugin } from '@gmap-vue/v3'
import '@gmap-vue/v3/dist/style.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(
  createGmapVuePlugin({
    load: { key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY },
  }),
)

app.mount('#app')
