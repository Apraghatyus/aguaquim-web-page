/**
 * hooks/useApi.js - Hook genérico para llamadas API con estado reactivo.
 *
 * Encapsula el patrón común de: cargar datos → mostrar loading → manejar error.
 * Cualquier función async de la capa api/ se puede envolver con este composable
 * para tener automáticamente las variables reactivas: data, loading, error.
 *
 * Uso:
 *   const { data, loading, error, execute } = useApi(getServices)
 *   // data.value contiene los servicios una vez cargados
 *   // loading.value es true mientras carga
 *   // error.value contiene el mensaje si falla
 *   // execute() permite recargar manualmente
 *
 * @param {Function} apiFn - Función async que retorna datos (ej: getServices)
 * @param {object} options - Opciones de configuración
 * @param {boolean} options.immediate - Si true (default), ejecuta al crear el composable
 */

import { ref, onMounted } from 'vue'

export function useApi(apiFn, { immediate = true } = {}) {
  /** Datos retornados por la API (o fallback) */
  const data = ref(null)

  /** Indica si la petición está en curso */
  const loading = ref(false)

  /** Mensaje de error si la petición falla */
  const error = ref(null)

  /**
   * Ejecuta la llamada a la API.
   * Actualiza data, loading y error de forma reactiva.
   * Se puede llamar manualmente para recargar datos.
   *
   * @param {...any} args - Argumentos que se pasan a la función API
   * @returns {Promise<any>} Los datos obtenidos
   */
  async function execute(...args) {
    loading.value = true
    error.value = null

    try {
      const result = await apiFn(...args)
      data.value = result
      return result
    } catch (err) {
      error.value = err.message || 'Error al cargar datos'
      console.error(`[useApi] Error en ${apiFn.name}:`, err)
    } finally {
      loading.value = false
    }
  }

  // Si immediate=true, ejecuta automáticamente al montar el componente
  if (immediate) {
    onMounted(() => execute())
  }

  return { data, loading, error, execute }
}
