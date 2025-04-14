import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importy Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Import Google Fonts
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

// Importy stylów aplikacji
import './style.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
