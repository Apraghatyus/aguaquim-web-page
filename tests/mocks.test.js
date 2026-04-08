/**
 * Tests para los datos mock.
 *
 * Verifica que los mocks se hayan creado correctamente con las factories
 * y que contengan los datos esperados para desarrollo sin backend.
 */
import { describe, it, expect } from 'vitest'
import { MOCK_SERVICES } from '../src/mocks/services.mock.js'
import { MOCK_CITIES } from '../src/mocks/coverage.mock.js'
import { MOCK_VALUES } from '../src/mocks/about.mock.js'
import { MOCK_CONTACT, MOCK_CONTACT_RESPONSE, MOCK_SIGNUP_RESPONSE } from '../src/mocks/contact.mock.js'

describe('MOCK_SERVICES', () => {
  it('contiene 3 servicios', () => {
    expect(MOCK_SERVICES).toHaveLength(3)
  })

  it('cada servicio tiene los campos del modelo Service', () => {
    MOCK_SERVICES.forEach(service => {
      expect(service).toHaveProperty('id')
      expect(service).toHaveProperty('icon')
      expect(service).toHaveProperty('title')
      expect(service).toHaveProperty('description')
      expect(service).toHaveProperty('items')
      expect(Array.isArray(service.items)).toBe(true)
    })
  })

  it('incluye Piscina, Agua Potable e IRCA', () => {
    const titles = MOCK_SERVICES.map(s => s.title)
    expect(titles).toContain('Análisis de Piscina')
    expect(titles).toContain('Análisis de Agua Potable')
    expect(titles).toContain('Parámetros IRCA')
  })
})

describe('MOCK_CITIES', () => {
  it('contiene 7 ciudades', () => {
    expect(MOCK_CITIES).toHaveLength(7)
  })

  it('cada ciudad tiene los campos del modelo City', () => {
    MOCK_CITIES.forEach(city => {
      expect(city).toHaveProperty('id')
      expect(city).toHaveProperty('name')
      expect(city).toHaveProperty('dept')
    })
  })

  it('incluye Cali y Santander de Quilichao', () => {
    const names = MOCK_CITIES.map(c => c.name)
    expect(names).toContain('Cali')
    expect(names).toContain('Santander de Quilichao')
  })
})

describe('MOCK_VALUES', () => {
  it('contiene 3 valores', () => {
    expect(MOCK_VALUES).toHaveLength(3)
  })

  it('cada valor tiene los campos del modelo CompanyValue', () => {
    MOCK_VALUES.forEach(value => {
      expect(value).toHaveProperty('id')
      expect(value).toHaveProperty('title')
      expect(value).toHaveProperty('desc')
    })
  })
})

describe('MOCK_CONTACT', () => {
  it('tiene teléfono y email', () => {
    expect(MOCK_CONTACT.phone).toBeTruthy()
    expect(MOCK_CONTACT.email).toContain('@')
  })

  it('tiene los campos del modelo Contact', () => {
    expect(MOCK_CONTACT).toHaveProperty('phone')
    expect(MOCK_CONTACT).toHaveProperty('phoneFormatted')
    expect(MOCK_CONTACT).toHaveProperty('email')
    expect(MOCK_CONTACT).toHaveProperty('whatsappMessage')
    expect(MOCK_CONTACT).toHaveProperty('address')
  })
})

describe('Respuestas mock', () => {
  it('MOCK_CONTACT_RESPONSE tiene success y message', () => {
    expect(MOCK_CONTACT_RESPONSE.success).toBe(true)
    expect(MOCK_CONTACT_RESPONSE.message).toBeTruthy()
  })

  it('MOCK_SIGNUP_RESPONSE tiene success y message', () => {
    expect(MOCK_SIGNUP_RESPONSE.success).toBe(true)
    expect(MOCK_SIGNUP_RESPONSE.message).toBeTruthy()
  })
})
