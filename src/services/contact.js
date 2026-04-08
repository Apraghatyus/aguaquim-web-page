/**
 * services/contact.js - Módulo de llamadas al backend para Contacto.
 *
 * Funciones para:
 * - Obtener información de contacto (teléfono, correo)
 * - Enviar formularios de contacto/inscripción al backend
 *
 * Modelos: Contact, ContactFormData, SignupData, ApiResponse (src/models/Contact.js)
 * Mocks:   MOCK_CONTACT, MOCK_CONTACT_RESPONSE, MOCK_SIGNUP_RESPONSE (src/mocks/contact.mock.js)
 */

import { apiClient } from './client.js'
import { createContact } from '../models/Contact.js'
import { MOCK_CONTACT, MOCK_CONTACT_RESPONSE, MOCK_SIGNUP_RESPONSE } from '../mocks/contact.mock.js'

/**
 * Obtiene la información de contacto del laboratorio.
 * Intenta cargar desde la API y normaliza con el modelo;
 * si falla, retorna los datos mock.
 *
 * @returns {Promise<import('../models/Contact.js').Contact>}
 */
export async function getContactInfo() {
  try {
    const raw = await apiClient.get('/contacto')
    return createContact(raw)
  } catch {
    return MOCK_CONTACT
  }
}

/**
 * Envía un formulario de contacto/inscripción al backend.
 *
 * @param {import('../models/Contact.js').ContactFormData} formData
 * @returns {Promise<import('../models/Contact.js').ApiResponse>}
 */
export async function submitContactForm(formData) {
  try {
    return await apiClient.post('/contacto/formulario', formData)
  } catch {
    console.info('[AGUAQUIM] Formulario pendiente de backend:', formData)
    return MOCK_CONTACT_RESPONSE
  }
}

/**
 * Envía una solicitud de inscripción al laboratorio.
 *
 * @param {import('../models/Contact.js').SignupData} data
 * @returns {Promise<import('../models/Contact.js').ApiResponse>}
 */
export async function submitSignup(data) {
  try {
    return await apiClient.post('/inscripcion', data)
  } catch {
    console.info('[AGUAQUIM] Inscripción pendiente de backend:', data)
    return MOCK_SIGNUP_RESPONSE
  }
}
