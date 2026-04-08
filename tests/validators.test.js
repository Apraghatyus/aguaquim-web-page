/**
 * Tests para las funciones de validación de formularios.
 *
 * Verifica que cada validador detecte campos faltantes,
 * formatos inválidos, y que pase con datos correctos.
 */
import { describe, it, expect } from 'vitest'
import {
  validateContactForm,
  validateSignup,
  validateLogin,
  isValid
} from '../src/utils/validators.js'

// ── validateContactForm ──

describe('validateContactForm', () => {
  const validForm = {
    name: 'Juan Pérez',
    email: 'juan@empresa.com',
    phone: '3177698439',
    service: 'Agua Potable',
    message: 'Necesito cotización'
  }

  it('pasa con datos válidos', () => {
    const errors = validateContactForm(validForm)
    expect(isValid(errors)).toBe(true)
  })

  it('pasa sin teléfono (es opcional)', () => {
    const errors = validateContactForm({ ...validForm, phone: undefined })
    expect(errors.phone).toBeUndefined()
  })

  it('detecta nombre vacío', () => {
    const errors = validateContactForm({ ...validForm, name: '' })
    expect(errors.name).toBeDefined()
  })

  it('detecta email vacío', () => {
    const errors = validateContactForm({ ...validForm, email: '' })
    expect(errors.email).toBeDefined()
  })

  it('detecta email inválido', () => {
    const errors = validateContactForm({ ...validForm, email: 'no-es-email' })
    expect(errors.email).toContain('formato')
  })

  it('detecta teléfono inválido', () => {
    const errors = validateContactForm({ ...validForm, phone: '123' })
    expect(errors.phone).toBeDefined()
  })

  it('detecta servicio vacío', () => {
    const errors = validateContactForm({ ...validForm, service: '' })
    expect(errors.service).toBeDefined()
  })

  it('detecta mensaje vacío', () => {
    const errors = validateContactForm({ ...validForm, message: '' })
    expect(errors.message).toBeDefined()
  })

  it('retorna todos los errores con datos vacíos', () => {
    const errors = validateContactForm({})
    expect(Object.keys(errors).length).toBeGreaterThanOrEqual(4)
  })
})

// ── validateSignup ──

describe('validateSignup', () => {
  const validSignup = {
    name: 'AGUAQUIM S.A.S.',
    nit: '900123456-1',
    email: 'empresa@test.com',
    phone: '3177698439',
    city: 'Cali',
    serviceType: 'Agua Potable'
  }

  it('pasa con datos válidos', () => {
    const errors = validateSignup(validSignup)
    expect(isValid(errors)).toBe(true)
  })

  it('detecta nombre vacío', () => {
    const errors = validateSignup({ ...validSignup, name: '' })
    expect(errors.name).toBeDefined()
  })

  it('detecta NIT vacío', () => {
    const errors = validateSignup({ ...validSignup, nit: '' })
    expect(errors.nit).toBeDefined()
  })

  it('detecta NIT inválido', () => {
    const errors = validateSignup({ ...validSignup, nit: 'abc' })
    expect(errors.nit).toContain('Formato')
  })

  it('detecta email inválido', () => {
    const errors = validateSignup({ ...validSignup, email: 'bad' })
    expect(errors.email).toBeDefined()
  })

  it('detecta teléfono obligatorio', () => {
    const errors = validateSignup({ ...validSignup, phone: '' })
    expect(errors.phone).toBeDefined()
  })

  it('detecta ciudad vacía', () => {
    const errors = validateSignup({ ...validSignup, city: '' })
    expect(errors.city).toBeDefined()
  })

  it('detecta tipo de servicio vacío', () => {
    const errors = validateSignup({ ...validSignup, serviceType: '' })
    expect(errors.serviceType).toBeDefined()
  })
})

// ── validateLogin ──

describe('validateLogin', () => {
  it('pasa con datos válidos', () => {
    const errors = validateLogin({ email: 'user@test.com', password: 'password123' })
    expect(isValid(errors)).toBe(true)
  })

  it('detecta email vacío', () => {
    const errors = validateLogin({ email: '', password: '12345678' })
    expect(errors.email).toBeDefined()
  })

  it('detecta email inválido', () => {
    const errors = validateLogin({ email: 'bad', password: '12345678' })
    expect(errors.email).toContain('formato')
  })

  it('detecta contraseña vacía', () => {
    const errors = validateLogin({ email: 'user@test.com', password: '' })
    expect(errors.password).toBeDefined()
  })

  it('detecta contraseña corta', () => {
    const errors = validateLogin({ email: 'user@test.com', password: '1234567' })
    expect(errors.password).toContain('8 caracteres')
  })
})

// ── isValid ──

describe('isValid', () => {
  it('retorna true con objeto vacío', () => {
    expect(isValid({})).toBe(true)
  })

  it('retorna false con errores', () => {
    expect(isValid({ email: 'Error' })).toBe(false)
  })
})
