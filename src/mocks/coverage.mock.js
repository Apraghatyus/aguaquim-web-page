/**
 * mocks/coverage.mock.js - Datos mock de ciudades de cobertura.
 *
 * Se usan cuando no hay conexión al backend.
 * La estructura sigue el modelo City (src/models/City.js).
 */

import { createCityList } from '../models/City.js'

/** @type {import('../models/City.js').City[]} */
const RAW_CITIES = [
  { id: 1, name: 'Cali', dept: 'Valle del Cauca' },
  { id: 2, name: 'Jamundí', dept: 'Valle del Cauca' },
  { id: 3, name: 'Yumbo', dept: 'Valle del Cauca' },
  { id: 4, name: 'Palmira', dept: 'Valle del Cauca' },
  { id: 5, name: 'Buga', dept: 'Valle del Cauca' },
  { id: 6, name: 'Candelaria', dept: 'Valle del Cauca' },
  { id: 7, name: 'Santander de Quilichao', dept: 'Cauca' }
]

export const MOCK_CITIES = createCityList(RAW_CITIES)
