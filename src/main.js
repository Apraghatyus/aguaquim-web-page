/**
 * Punto de entrada principal de la aplicación Vue.
 *
 * Registra Pinia (stores), el router y los estilos globales
 * (src/assets/styles/main.css → 13 parciales CSS) antes de montar la app.
 *
 * Arquitectura: main.js → App.vue → Router → Vistas → Componentes
 *   Estado:  Pinia stores (src/stores/) — auth, etc.
 *   Datos:   Modelos → Mocks → Services → Hooks → Componentes
 *   Estilos: 13 parciales CSS centralizados (sin <style> en .vue)
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
