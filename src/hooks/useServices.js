/**
 * hooks/useServices.js - Hook para consumir los servicios del laboratorio.
 *
 * Retorna la lista de servicios con estado reactivo (data, loading, error).
 * Los datos se cargan desde el servicio y se normalizan con el modelo Service.
 * Si la API no responde, retorna los datos mock de fallback.
 *
 * Flujo: Service (modelo) → MOCK_SERVICES (mock) → getServices() (services) → useServices()
 *
 * Uso en un componente:
 *   const { services, loading, error } = useServices()
 *   // services.value = Service[] (ver src/models/Service.js)
 */

import { computed } from 'vue'
import { useApi } from './useApi.js'
import { getServices } from '../services/services.js'

export function useServices() {
  const { data, loading, error, execute } = useApi(getServices)

  return {
    /** Lista de servicios (reactiva) */
    services: computed(() => data.value || []),
    loading,
    error,
    /** Recargar servicios desde la API */
    refresh: execute
  }
}
