/**
 * hooks/useContact.js - Hook para gestionar contacto e inscripciones.
 *
 * Provee:
 * - Información de contacto reactiva (teléfono, email, WhatsApp)
 * - Función para enviar formulario de contacto
 * - Función para enviar inscripción
 * - Estado de envío (submitting, submitError, submitSuccess)
 *
 * Flujo: Contact (modelo) → MOCK_CONTACT (mock) → getContactInfo() (services) → useContact()
 * Tipos: Contact, ContactFormData, SignupData, ApiResponse (src/models/Contact.js)
 *
 * Uso en un componente:
 *   const { contact, submitForm, submitting } = useContact()
 *   // contact.value = Contact (ver src/models/Contact.js)
 *   // await submitForm({ name: '...', email: '...' })
 */

import { ref, computed } from 'vue'
import { useApi } from './useApi.js'
import { getContactInfo, submitContactForm, submitSignup } from '../services/contact.js'

export function useContact() {
  const { data, loading, error } = useApi(getContactInfo)

  // Estado de envío de formularios
  const submitting = ref(false)
  const submitError = ref(null)
  const submitSuccess = ref(false)

  /**
   * Genera la URL de WhatsApp con el mensaje pre-escrito.
   * Usa el teléfono y mensaje del contacto cargado.
   */
  const whatsappUrl = computed(() => {
    const info = data.value
    if (!info) return '#'
    const msg = encodeURIComponent(info.whatsappMessage)
    return `https://wa.me/57${info.phone}?text=${msg}`
  })

  /**
   * Genera la URL mailto con el correo del laboratorio.
   */
  const mailtoUrl = computed(() => {
    const info = data.value
    if (!info) return '#'
    return `mailto:${info.email}`
  })

  /**
   * Envía un formulario de contacto al backend.
   * Maneja los estados de submitting, error y success automáticamente.
   *
   * @param {object} formData - Datos del formulario
   * @returns {Promise<object>} Respuesta del servidor
   */
  async function submitForm(formData) {
    submitting.value = true
    submitError.value = null
    submitSuccess.value = false

    try {
      const result = await submitContactForm(formData)
      submitSuccess.value = true
      return result
    } catch (err) {
      submitError.value = err.message || 'Error al enviar el formulario'
    } finally {
      submitting.value = false
    }
  }

  /**
   * Envía una solicitud de inscripción al backend.
   *
   * @param {object} signupData - Datos de inscripción
   * @returns {Promise<object>} Respuesta del servidor
   */
  async function submitSignupForm(signupData) {
    submitting.value = true
    submitError.value = null
    submitSuccess.value = false

    try {
      const result = await submitSignup(signupData)
      submitSuccess.value = true
      return result
    } catch (err) {
      submitError.value = err.message || 'Error al enviar la inscripción'
    } finally {
      submitting.value = false
    }
  }

  return {
    /** Datos de contacto del laboratorio (reactivo) */
    contact: computed(() => data.value || {}),
    /** URL de WhatsApp generada dinámicamente */
    whatsappUrl,
    /** URL mailto generada dinámicamente */
    mailtoUrl,
    loading,
    error,
    /** Indica si un formulario se está enviando */
    submitting,
    /** Error del último envío de formulario */
    submitError,
    /** Indica si el último envío fue exitoso */
    submitSuccess,
    /** Enviar formulario de contacto */
    submitForm,
    /** Enviar formulario de inscripción */
    submitSignupForm
  }
}
