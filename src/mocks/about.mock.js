/**
 * mocks/about.mock.js - Datos mock de valores/pilares de la empresa.
 *
 * Se usan cuando no hay conexión al backend.
 * La estructura sigue el modelo CompanyValue (src/models/CompanyValue.js).
 */

import { createCompanyValueList } from '../models/CompanyValue.js'

/** @type {import('../models/CompanyValue.js').CompanyValue[]} */
const RAW_VALUES = [
  {
    id: 1,
    title: 'Misión',
    desc: 'Brindar servicios analíticos de alta calidad con resultados confiables y trazables bajo la NTC 17025, con tecnología de vanguardia, talento colombiano y compromiso con la Responsabilidad Social.'
  },
  {
    id: 2,
    title: 'Visión',
    desc: 'Ser líderes en servicios de laboratorio mediante la excelencia continua, tecnología de punta y un equipo humano motivado, siendo ejemplo de desarrollo sustentable y Responsabilidad Social.'
  }
]

export const MOCK_VALUES = createCompanyValueList(RAW_VALUES)
