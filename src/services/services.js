/**
 * services/services.js - Módulo de llamadas al backend para Servicios.
 *
 * Funciones para obtener y gestionar los servicios de análisis
 * (piscina, agua potable, IRCA) desde la API.
 *
 * Modelos: Service (src/models/Service.js)
 * Mocks:   MOCK_SERVICES (src/mocks/services.mock.js)
 */

import { apiClient } from './client.js'
import { createServiceList, createService } from '../models/Service.js'
import { MOCK_SERVICES } from '../mocks/services.mock.js'

/**
 * Obtiene la lista de servicios del laboratorio.
 * Intenta cargar desde la API y normaliza con el modelo;
 * si falla, retorna los datos mock.
 *
 * @returns {Promise<import('../models/Service.js').Service[]>}
 */
export async function getServices() {
  try {
    const raw = await apiClient.get('/servicios')
    return createServiceList(raw)
  } catch {
    return MOCK_SERVICES
  }
}

/**
 * Obtiene un servicio específico por su ID.
 *
 * @param {number|string} id - ID del servicio
 * @returns {Promise<import('../models/Service.js').Service|null>}
 */
export async function getServiceById(id) {
  try {
    const raw = await apiClient.get(`/servicios/${id}`)
    return createService(raw)
  } catch {
    return MOCK_SERVICES.find(s => s.id === Number(id)) || null
  }
}
