/**
 * hooks/useCoverage.js - Hook para consumir las ciudades de cobertura.
 *
 * Retorna la lista de ciudades con estado reactivo.
 * Los datos se cargan desde el servicio y se normalizan con el modelo City.
 * Cuenta automáticamente el total de ciudades para la estadística.
 *
 * Flujo: City (modelo) → MOCK_CITIES (mock) → getCities() (services) → useCoverage()
 *
 * Uso en un componente:
 *   const { cities, totalCities, loading } = useCoverage()
 *   // cities.value = City[] (ver src/models/City.js)
 */

import { computed } from 'vue'
import { useApi } from './useApi.js'
import { getCities } from '../services/coverage.js'

export function useCoverage() {
  const { data, loading, error, execute } = useApi(getCities)

  return {
    /** Lista de ciudades (reactiva) */
    cities: computed(() => data.value || []),
    /** Total de ciudades para mostrar en la estadística */
    totalCities: computed(() => (data.value || []).length),
    loading,
    error,
    /** Recargar ciudades desde la API */
    refresh: execute
  }
}
