/**
 * models/Contact.js - Modelo de datos para la información de contacto.
 *
 * Define la estructura que retorna la API en GET /contacto.
 * La factory createContact() normaliza datos crudos del JSON.
 *
 * @typedef {object} Contact
 * @property {string}      phone           - Número de teléfono sin formato (ej: "3177698439")
 * @property {string}      phoneFormatted  - Número formateado para mostrar (ej: "317 769 8439")
 * @property {string}      email           - Correo electrónico del laboratorio
 * @property {string}      whatsappMessage - Mensaje pre-escrito para WhatsApp
 * @property {string|null} address         - Dirección física (puede ser null)
 */

/**
 * Crea una instancia normalizada de Contact a partir de datos crudos.
 *
 * @param {object} raw - Objeto JSON crudo del backend o mock
 * @returns {Contact}
 */
export function createContact(raw = {}) {
  return {
    phone: raw.phone ?? '',
    phoneFormatted: raw.phoneFormatted ?? '',
    email: raw.email ?? '',
    whatsappMessage: raw.whatsappMessage ?? '',
    address: raw.address ?? null
  }
}

/**
 * @typedef {object} ContactFormData
 * @property {string} name    - Nombre del contacto
 * @property {string} email   - Correo electrónico
 * @property {string} [phone] - Teléfono (opcional)
 * @property {string} [company] - Empresa (opcional)
 * @property {string} service - Servicio de interés
 * @property {string} message - Mensaje adicional
 */

/**
 * @typedef {object} SignupData
 * @property {string} name        - Nombre o razón social
 * @property {string} nit         - NIT o cédula
 * @property {string} email       - Correo electrónico
 * @property {string} phone       - Teléfono
 * @property {string} city        - Ciudad
 * @property {string} serviceType - Tipo de análisis requerido
 */

/**
 * @typedef {object} ApiResponse
 * @property {boolean} success - Indica si la operación fue exitosa
 * @property {string}  message - Mensaje descriptivo del resultado
 */
