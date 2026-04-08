/**
 * models/index.js - Barrel export de todos los modelos de datos.
 *
 * Centraliza las exportaciones para importar desde un solo lugar:
 *   import { createService, createCity, createContact } from '@/models'
 */

export { createService, createServiceList } from './Service.js'
export { createCity, createCityList } from './City.js'
export { createCompanyValue, createCompanyValueList } from './CompanyValue.js'
export { createContact } from './Contact.js'
