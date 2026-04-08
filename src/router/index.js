/**
 * Router principal de AGUAQUIM.
 *
 * Configura las rutas de la aplicación con lazy-loading.
 * La home carga todas las secciones de la landing page (src/views/HomePage.vue).
 * Nuevas páginas se agregan aquí con import() dinámico.
 *
 * Incluye route guards para proteger páginas que requieren autenticación.
 * Se marca una ruta como protegida con meta: { requiresAuth: true }.
 *
 * Scroll behavior:
 * - Hash (#servicios, #contacto) → scroll suave al ancla
 * - Botón atrás/adelante → restaura posición guardada
 * - Navegación normal → scroll al inicio
 */
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  }
  // Futuras rutas protegidas:
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('../views/DashboardPage.vue'),
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/mis-resultados',
  //   name: 'Results',
  //   component: () => import('../views/ResultsPage.vue'),
  //   meta: { requiresAuth: true }
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('../views/LoginPage.vue'),
  //   meta: { guestOnly: true }
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Si hay un hash (#servicios, #contacto), scroll a ese ancla
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    // Si se navega con botón atrás/adelante, restaurar posición
    if (savedPosition) {
      return savedPosition
    }
    // Por defecto, scroll al inicio
    return { top: 0 }
  }
})

/**
 * Guard global de navegación.
 *
 * - Rutas con meta.requiresAuth: redirige a Home si no está autenticado.
 * - Rutas con meta.guestOnly: redirige a Home si ya está autenticado
 *   (ej: evitar que un usuario logueado vea la página de login).
 */
router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'Home' }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'Home' }
  }
})

export default router
