/**
 * utils/validators.js - Funciones de validación de formularios.
 *
 * Valida los datos de ContactFormData y SignupData antes de enviarlos
 * al backend. Retorna un objeto con los errores encontrados.
 *
 * Uso:
 *   import { validateContactForm, validateSignup } from '@/utils/validators'
 *   const errors = validateContactForm({ name: '', email: 'bad' })
 *   // errors = { name: 'El nombre es obligatorio', email: 'Email inválido' }
 *   if (Object.keys(errors).length === 0) { /* enviar * / }
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9]{7,15}$/
const NIT_REGEX = /^[0-9]{6,15}(-[0-9])?$/

/**
 * Valida un formulario de contacto.
 *
 * @param {import('../models/Contact.js').ContactFormData} data
 * @returns {Record<string, string>} Objeto con errores (vacío si es válido)
 */
export function validateContactForm(data = {}) {
  const errors = {}

  if (!data.name?.trim()) {
    errors.name = 'El nombre es obligatorio'
  }

  if (!data.email?.trim()) {
    errors.email = 'El correo electrónico es obligatorio'
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'El formato del correo no es válido'
  }

  if (data.phone && !PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'El teléfono debe tener entre 7 y 15 dígitos'
  }

  if (!data.service?.trim()) {
    errors.service = 'Selecciona un servicio de interés'
  }

  if (!data.message?.trim()) {
    errors.message = 'El mensaje es obligatorio'
  }

  return errors
}

/**
 * Valida un formulario de inscripción.
 *
 * @param {import('../models/Contact.js').SignupData} data
 * @returns {Record<string, string>} Objeto con errores (vacío si es válido)
 */
export function validateSignup(data = {}) {
  const errors = {}

  if (!data.name?.trim()) {
    errors.name = 'El nombre o razón social es obligatorio'
  }

  if (!data.nit?.trim()) {
    errors.nit = 'El NIT o cédula es obligatorio'
  } else if (!NIT_REGEX.test(data.nit.trim())) {
    errors.nit = 'Formato de NIT inválido (ej: 900123456-1)'
  }

  if (!data.email?.trim()) {
    errors.email = 'El correo electrónico es obligatorio'
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'El formato del correo no es válido'
  }

  if (!data.phone?.trim()) {
    errors.phone = 'El teléfono es obligatorio'
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'El teléfono debe tener entre 7 y 15 dígitos'
  }

  if (!data.city?.trim()) {
    errors.city = 'La ciudad es obligatoria'
  }

  if (!data.serviceType?.trim()) {
    errors.serviceType = 'Selecciona el tipo de análisis requerido'
  }

  return errors
}

/**
 * Valida credenciales de login.
 *
 * @param {{ email: string, password: string }} data
 * @returns {Record<string, string>} Objeto con errores (vacío si es válido)
 */
export function validateLogin(data = {}) {
  const errors = {}

  if (!data.email?.trim()) {
    errors.email = 'El correo electrónico es obligatorio'
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'El formato del correo no es válido'
  }

  if (!data.password) {
    errors.password = 'La contraseña es obligatoria'
  } else if (data.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres'
  }

  return errors
}

/**
 * Verifica si un resultado de validación tiene errores.
 *
 * @param {Record<string, string>} errors - Resultado de validate*()
 * @returns {boolean} true si NO hay errores
 */
export function isValid(errors) {
  return Object.keys(errors).length === 0
}
