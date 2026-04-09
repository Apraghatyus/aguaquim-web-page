/**
 * mocks/services.mock.js - Datos mock de servicios de análisis.
 *
 * Se usan cuando no hay conexión al backend.
 * La estructura sigue el modelo Service (src/models/Service.js).
 */

import { createServiceList } from '../models/Service.js'

/** @type {import('../models/Service.js').Service[]} */
const RAW_SERVICES = [
  {
    id: 1,
    icon: '🏊',
    title: 'Análisis de Piscina',
    description: 'Control y monitoreo de la calidad del agua en piscinas para cumplir con la normatividad sanitaria vigente.',
    items: [
      'pH y cloro residual',
      'Turbidez',
      'Análisis microbiológico',
      'Alcalinidad y dureza'
    ]
  },
  {
    id: 2,
    icon: '💧',
    title: 'Análisis de Agua Potable',
    description: 'Verificamos que el agua destinada al consumo humano cumpla con los parámetros de calidad establecidos.',
    items: [
      'Parámetros físicos',
      'Parámetros químicos',
      'Parámetros microbiológicos',
      'Metales pesados'
    ]
  },
  {
    id: 3,
    icon: '📋',
    title: 'Parámetros IRCA',
    description: 'Evaluación del Índice de Riesgo de la Calidad del Agua según la normatividad colombiana.',
    items: [
      'Color y olor',
      'Sustancias químicas',
      'Coliformes totales y E. coli',
      'Cálculo del índice IRCA'
    ]
  },
  {
    id: 4,
    icon: '🏊‍♂️',
    title: 'Capacitación Operarios de Piscina',
    description: 'Formación técnica para el manejo seguro y eficiente de sistemas de tratamiento de agua en piscinas.',
    items: [
      'Normatividad sanitaria',
      'Dosificación de químicos',
      'Mantenimiento preventivo',
      'Protocolos de emergencia'
    ]
  },
  {
    id: 5,
    icon: '🪣',
    title: 'Capacitación Lavado de Tanques',
    description: 'Entrenamiento en procedimientos de limpieza y desinfección de tanques de almacenamiento de agua.',
    items: [
      'Protocolos de limpieza',
      'Desinfección certificada',
      'Toma de muestras',
      'Registro y trazabilidad'
    ]
  },
  {
    id: 6,
    icon: '🌿',
    title: 'Asesorías de Jardinería',
    description: 'Consultoría especializada en riego, sustratos y manejo del agua para el cuidado de jardines y zonas verdes.',
    items: [
      'Análisis de suelo y agua',
      'Sistemas de riego eficiente',
      'Fertilización y sustratos',
      'Manejo integrado de plagas'
    ]
  }
]

export const MOCK_SERVICES = createServiceList(RAW_SERVICES)
