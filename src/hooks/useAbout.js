/**
 * hooks/useAbout.js - Hook para consumir los valores de la empresa.
 *
 * Retorna la lista de valores/pilares con estado reactivo.
 * Los datos se cargan desde el servicio y se normalizan con el modelo CompanyValue.
 *
 * Flujo: CompanyValue (modelo) → MOCK_VALUES (mock) → getCompanyValues() (services) → useAbout()
 *
 * Uso en un componente:
 *   const { values, loading } = useAbout()
 *   // values.value = CompanyValue[] (ver src/models/CompanyValue.js)
 */

import { computed } from 'vue'
import { useApi } from './useApi.js'
import { getCompanyValues } from '../services/about.js'

export function useAbout() {
  const { data, loading, error, execute } = useApi(getCompanyValues)

  return {
    /** Valores/pilares de la empresa (reactiva) */
    values: computed(() => data.value || []),
    loading,
    error,
    /** Recargar valores desde la API */
    refresh: execute
  }
}
