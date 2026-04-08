/**
 * models/CompanyValue.js - Modelo de datos para un valor/pilar de la empresa.
 *
 * Define la estructura que retorna la API en GET /empresa/valores.
 * La factory createCompanyValue() normaliza datos crudos del JSON.
 *
 * @typedef {object} CompanyValue
 * @property {number} id    - Identificador único del valor
 * @property {string} title - Nombre del pilar (ej: "Precisión")
 * @property {string} desc  - Descripción del pilar
 */

/**
 * Crea una instancia normalizada de CompanyValue a partir de datos crudos.
 *
 * @param {object} raw - Objeto JSON crudo del backend o mock
 * @returns {CompanyValue}
 */
export function createCompanyValue(raw = {}) {
  return {
    id: raw.id ?? 0,
    title: raw.title ?? '',
    desc: raw.desc ?? ''
  }
}

/**
 * Normaliza un array de valores crudos.
 *
 * @param {object[]} rawList - Array de objetos JSON crudos
 * @returns {CompanyValue[]}
 */
export function createCompanyValueList(rawList = []) {
  return rawList.map(createCompanyValue)
}
