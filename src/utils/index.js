/**
 * utils/index.js - Barrel export de utilidades.
 *
 * Centraliza las exportaciones para importar desde un solo lugar:
 *   import { validateContactForm, isValid } from '@/utils'
 */

export {
  validateContactForm,
  validateSignup,
  validateLogin,
  isValid
} from './validators.js'
