/**
 * models/City.js - Modelo de datos para una ciudad de cobertura.
 *
 * Define la estructura que retorna la API en GET /cobertura.
 * La factory createCity() normaliza datos crudos del JSON.
 *
 * @typedef {object} City
 * @property {number} id   - Identificador único de la ciudad
 * @property {string} name - Nombre de la ciudad
 * @property {string} dept - Departamento al que pertenece
 */

/**
 * Crea una instancia normalizada de City a partir de datos crudos.
 *
 * @param {object} raw - Objeto JSON crudo del backend o mock
 * @returns {City}
 */
export function createCity(raw = {}) {
  return {
    id: raw.id ?? 0,
    name: raw.name ?? '',
    dept: raw.dept ?? ''
  }
}

/**
 * Normaliza un array de ciudades crudas.
 *
 * @param {object[]} rawList - Array de objetos JSON crudos
 * @returns {City[]}
 */
export function createCityList(rawList = []) {
  return rawList.map(createCity)
}
