import 'bootstrap/dist/css/bootstrap.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Footer from './Footer.vue'

const app = createApp(App)
const footer = createApp(Footer)

app.mount('#app')
footer.mount('#footer')