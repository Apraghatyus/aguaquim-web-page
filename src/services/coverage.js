/**
 * services/coverage.js - Módulo de llamadas al backend para Cobertura.
 *
 * Funciones para obtener las ciudades donde AGUAQUIM presta servicio.
 *
 * Modelos: City (src/models/City.js)
 * Mocks:   MOCK_CITIES (src/mocks/coverage.mock.js)
 */

import { apiClient } from './client.js'
import { createCityList } from '../models/City.js'
import { MOCK_CITIES } from '../mocks/coverage.mock.js'

/**
 * Obtiene la lista de ciudades con cobertura de servicio.
 * Intenta cargar desde la API y normaliza con el modelo;
 * si falla, retorna los datos mock.
 *
 * @returns {Promise<import('../models/City.js').City[]>}
 */
export async function getCities() {
  try {
    const raw = await apiClient.get('/cobertura')
    return createCityList(raw)
  } catch {
    return MOCK_CITIES
  }
}
