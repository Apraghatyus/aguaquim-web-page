/**
 * mocks/contact.mock.js - Datos mock de información de contacto.
 *
 * Se usan cuando no hay conexión al backend.
 * La estructura sigue el modelo Contact (src/models/Contact.js).
 */

import { createContact } from '../models/Contact.js'

/** @type {import('../models/Contact.js').Contact} */
export const MOCK_CONTACT = createContact({
  phone: '3177698439',
  phoneFormatted: '317 769 8439',
  email: 'aguaquimlaboratorio@gmail.com',
  whatsappMessage: 'Hola, estoy interesado en los servicios de análisis de agua de AGUAQUIM.',
  address: null
})

/**
 * Respuesta simulada para envío de formulario de contacto.
 * @type {import('../models/Contact.js').ApiResponse}
 */
export const MOCK_CONTACT_RESPONSE = {
  success: true,
  message: 'Gracias por tu interés. Te contactaremos pronto.'
}

/**
 * Respuesta simulada para envío de inscripción.
 * @type {import('../models/Contact.js').ApiResponse}
 */
export const MOCK_SIGNUP_RESPONSE = {
  success: true,
  message: 'Inscripción recibida. Un asesor se comunicará contigo.'
}
