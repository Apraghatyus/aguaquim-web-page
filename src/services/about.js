/**
 * services/about.js - Módulo de llamadas al backend para Quiénes Somos.
 *
 * Funciones para obtener los valores de la empresa y la información
 * institucional.
 *
 * Modelos: CompanyValue (src/models/CompanyValue.js)
 * Mocks:   MOCK_VALUES (src/mocks/about.mock.js)
 */

import { apiClient } from './client.js'
import { createCompanyValueList } from '../models/CompanyValue.js'
import { MOCK_VALUES } from '../mocks/about.mock.js'

/**
 * Obtiene los valores/pilares de la empresa.
 * Intenta cargar desde la API y normaliza con el modelo;
 * si falla, retorna los datos mock.
 *
 * @returns {Promise<import('../models/CompanyValue.js').CompanyValue[]>}
 */
export async function getCompanyValues() {
  try {
    const raw = await apiClient.get('/empresa/valores')
    return createCompanyValueList(raw)
  } catch {
    return MOCK_VALUES
  }
}
