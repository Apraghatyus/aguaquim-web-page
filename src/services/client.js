/**
 * services/client.js - Cliente HTTP base para comunicarse con el backend.
 *
 * Provee un wrapper sobre fetch() con:
 * - URL base configurable via variable de entorno (VITE_API_URL)
 * - Headers por defecto (JSON)
 * - Inyección automática del token JWT (Authorization: Bearer)
 * - Manejo centralizado de errores (incluyendo 401 → logout)
 * - Métodos GET, POST, PUT, DELETE
 *
 * Cuando el backend esté listo, solo hay que configurar VITE_API_URL
 * en el archivo .env y todas las llamadas pasarán por aquí.
 *
 * Uso:
 *   import { apiClient } from '@/services/client'
 *   const data = await apiClient.get('/servicios')
 */

// URL base del backend. Se configura en .env (ej: VITE_API_URL=https://api.aguaquim.com)
// Si no está definida, usa '/api' como fallback para desarrollo con proxy.
const BASE_URL = import.meta.env.VITE_API_URL || '/api'

const TOKEN_KEY = 'aguaquim-token'

/**
 * Obtiene el token JWT almacenado.
 * Se lee directamente de localStorage para evitar dependencia circular con Pinia.
 *
 * @returns {string|null}
 */
function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * Maneja la expiración del token (HTTP 401).
 * Limpia localStorage y redirige al inicio.
 */
function handleUnauthorized() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem('aguaquim-user')

  // Solo redirige si no estamos ya en la home
  if (window.location.pathname !== '/') {
    window.location.href = '/'
  }
}

/**
 * Realiza una petición HTTP al backend.
 *
 * @param {string} endpoint - Ruta relativa del recurso (ej: '/servicios')
 * @param {object} options - Opciones de fetch (method, body, headers, etc.)
 * @returns {Promise<any>} - Datos de la respuesta parseados como JSON
 * @throws {Error} - Si la respuesta no es exitosa (status >= 400)
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`

  // Inyectar token JWT si existe
  const authHeaders = {}
  const token = getToken()
  if (token) {
    authHeaders['Authorization'] = `Bearer ${token}`
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...options.headers
    },
    ...options
  }

  // Si el body es un objeto, lo serializa a JSON automáticamente
  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body)
  }

  const response = await fetch(url, config)

  // Sesión expirada → limpiar y redirigir
  if (response.status === 401) {
    handleUnauthorized()
    const error = new Error('Sesión expirada. Por favor inicia sesión de nuevo.')
    error.status = 401
    throw error
  }

  // Manejo centralizado de errores HTTP
  if (!response.ok) {
    const error = new Error(`Error ${response.status}: ${response.statusText}`)
    error.status = response.status
    error.response = response
    throw error
  }

  // Algunas respuestas no tienen body (ej: 204 No Content)
  if (response.status === 204) {
    return null
  }

  return response.json()
}

/**
 * Cliente API con métodos HTTP convenientes.
 * Cada método es un shortcut de request() con el verbo HTTP correspondiente.
 */
export const apiClient = {
  /**
   * GET - Obtener datos del backend.
   * @param {string} endpoint - Ruta (ej: '/servicios')
   * @param {object} options - Opciones adicionales de fetch
   */
  get: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'GET' }),

  /**
   * POST - Enviar datos al backend (crear recurso).
   * @param {string} endpoint - Ruta (ej: '/contacto')
   * @param {object} data - Datos a enviar en el body
   * @param {object} options - Opciones adicionales de fetch
   */
  post: (endpoint, data, options = {}) =>
    request(endpoint, { ...options, method: 'POST', body: data }),

  /**
   * PUT - Actualizar un recurso existente.
   * @param {string} endpoint - Ruta (ej: '/servicios/1')
   * @param {object} data - Datos actualizados
   * @param {object} options - Opciones adicionales de fetch
   */
  put: (endpoint, data, options = {}) =>
    request(endpoint, { ...options, method: 'PUT', body: data }),

  /**
   * DELETE - Eliminar un recurso.
   * @param {string} endpoint - Ruta (ej: '/servicios/1')
   * @param {object} options - Opciones adicionales de fetch
   */
  delete: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'DELETE' })
}
