/**
 * stores/auth.js - Store de autenticación con Pinia.
 *
 * Gestiona el estado global del usuario autenticado:
 * - Token JWT (guardado en localStorage para persistencia)
 * - Datos del usuario (nombre, email, rol)
 * - Login, logout y verificación de sesión
 *
 * Uso:
 *   import { useAuthStore } from '@/stores/auth'
 *   const auth = useAuthStore()
 *   await auth.login({ email, password })
 *   auth.isAuthenticated  // true/false
 *   auth.user             // { name, email, role }
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '../services/client.js'

const TOKEN_KEY = 'aguaquim-token'
const USER_KEY = 'aguaquim-user'

export const useAuthStore = defineStore('auth', () => {
  // ── Estado ──
  const token = ref(localStorage.getItem(TOKEN_KEY) || null)
  const user = ref(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))
  const loading = ref(false)
  const error = ref(null)

  // ── Getters ──

  /** Indica si hay una sesión activa */
  const isAuthenticated = computed(() => !!token.value)

  /** Nombre del usuario para mostrar en la UI */
  const displayName = computed(() => user.value?.name || '')

  // ── Acciones ──

  /**
   * Inicia sesión con credenciales.
   * Guarda token y datos del usuario en localStorage.
   *
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<boolean>} true si el login fue exitoso
   */
  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const response = await apiClient.post('/auth/login', credentials)
      token.value = response.token
      user.value = response.user

      localStorage.setItem(TOKEN_KEY, response.token)
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))

      return true
    } catch (err) {
      error.value = err.message || 'Error al iniciar sesión'
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Cierra la sesión. Limpia token y datos del usuario.
   */
  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  /**
   * Verifica si el token actual sigue siendo válido.
   * Se llama al iniciar la app para validar sesiones persistidas.
   *
   * @returns {Promise<boolean>} true si la sesión es válida
   */
  async function checkSession() {
    if (!token.value) return false

    try {
      const response = await apiClient.get('/auth/me')
      user.value = response.user
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))
      return true
    } catch {
      logout()
      return false
    }
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    displayName,
    login,
    logout,
    checkSession
  }
})
