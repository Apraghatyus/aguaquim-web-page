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
    title: 'Precisión',
    desc: 'Resultados confiables respaldados por métodos estandarizados y equipos calibrados.'
  },
  {
    id: 2,
    title: 'Calidad',
    desc: 'Compromiso con los más altos estándares del sector y la normatividad colombiana.'
  },
  {
    id: 3,
    title: 'Servicio',
    desc: 'Atención personalizada y acompañamiento continuo a cada uno de nuestros clientes.'
  }
]

export const MOCK_VALUES = createCompanyValueList(RAW_VALUES)
