/**
 * services/index.js - Barrel export de todos los módulos de servicios.
 *
 * Centraliza las exportaciones para importar desde un solo lugar:
 *   import { getServices, getCities, submitContactForm } from '@/services'
 *
 * También re-exporta el cliente base por si se necesita usar directamente.
 */

export { apiClient } from './client.js'
export { getServices, getServiceById } from './services.js'
export { getCities } from './coverage.js'
export { getCompanyValues } from './about.js'
export { getContactInfo, submitContactForm, submitSignup } from './contact.js'
