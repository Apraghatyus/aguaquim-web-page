/**
 * Tests para los modelos de datos (factories).
 *
 * Verifica que las factories normalicen correctamente datos crudos
 * y que los valores por defecto se apliquen cuando faltan campos.
 */
import { describe, it, expect } from 'vitest'
import { createService, createServiceList } from '../src/models/Service.js'
import { createCity, createCityList } from '../src/models/City.js'
import { createCompanyValue, createCompanyValueList } from '../src/models/CompanyValue.js'
import { createContact } from '../src/models/Contact.js'

describe('createService', () => {
  it('normaliza datos completos', () => {
    const raw = { id: 1, icon: '🏊', title: 'Piscina', description: 'Desc', items: ['pH'] }
    const service = createService(raw)

    expect(service.id).toBe(1)
    expect(service.icon).toBe('🏊')
    expect(service.title).toBe('Piscina')
    expect(service.description).toBe('Desc')
    expect(service.items).toEqual(['pH'])
  })

  it('aplica valores por defecto cuando faltan campos', () => {
    const service = createService({})

    expect(service.id).toBe(0)
    expect(service.icon).toBe('')
    expect(service.title).toBe('')
    expect(service.description).toBe('')
    expect(service.items).toEqual([])
  })

  it('aplica valores por defecto sin argumentos', () => {
    const service = createService()

    expect(service.id).toBe(0)
    expect(service.items).toEqual([])
  })

  it('maneja items no-array como array vacío', () => {
    const service = createService({ items: 'no-es-array' })
    expect(service.items).toEqual([])
  })
})

describe('createServiceList', () => {
  it('normaliza un array de servicios', () => {
    const list = createServiceList([
      { id: 1, title: 'A' },
      { id: 2, title: 'B' }
    ])

    expect(list).toHaveLength(2)
    expect(list[0].title).toBe('A')
    expect(list[1].title).toBe('B')
  })

  it('retorna array vacío sin argumentos', () => {
    expect(createServiceList()).toEqual([])
  })
})

describe('createCity', () => {
  it('normaliza datos completos', () => {
    const city = createCity({ id: 1, name: 'Cali', dept: 'Valle del Cauca' })

    expect(city.id).toBe(1)
    expect(city.name).toBe('Cali')
    expect(city.dept).toBe('Valle del Cauca')
  })

  it('aplica valores por defecto', () => {
    const city = createCity()

    expect(city.id).toBe(0)
    expect(city.name).toBe('')
    expect(city.dept).toBe('')
  })
})

describe('createCityList', () => {
  it('normaliza un array de ciudades', () => {
    const list = createCityList([{ id: 1, name: 'Cali' }])
    expect(list).toHaveLength(1)
    expect(list[0].name).toBe('Cali')
  })
})

describe('createCompanyValue', () => {
  it('normaliza datos completos', () => {
    const value = createCompanyValue({ id: 1, title: 'Precisión', desc: 'Resultados confiables' })

    expect(value.id).toBe(1)
    expect(value.title).toBe('Precisión')
    expect(value.desc).toBe('Resultados confiables')
  })

  it('aplica valores por defecto', () => {
    const value = createCompanyValue()

    expect(value.id).toBe(0)
    expect(value.title).toBe('')
    expect(value.desc).toBe('')
  })
})

describe('createCompanyValueList', () => {
  it('normaliza un array de valores', () => {
    const list = createCompanyValueList([{ id: 1 }, { id: 2 }])
    expect(list).toHaveLength(2)
  })
})

describe('createContact', () => {
  it('normaliza datos completos', () => {
    const contact = createContact({
      phone: '3177698439',
      phoneFormatted: '317 769 8439',
      email: 'test@test.com',
      whatsappMessage: 'Hola',
      address: 'Cali, Colombia'
    })

    expect(contact.phone).toBe('3177698439')
    expect(contact.phoneFormatted).toBe('317 769 8439')
    expect(contact.email).toBe('test@test.com')
    expect(contact.whatsappMessage).toBe('Hola')
    expect(contact.address).toBe('Cali, Colombia')
  })

  it('aplica valores por defecto', () => {
    const contact = createContact()

    expect(contact.phone).toBe('')
    expect(contact.email).toBe('')
    expect(contact.address).toBeNull()
  })
})
