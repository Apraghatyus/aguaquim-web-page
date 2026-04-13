/**
 * models/Service.js - Modelo de datos para un servicio de análisis.
 *
 * Define la estructura que retorna la API en GET /servicios.
 * La factory createService() normaliza datos crudos del JSON.
 *
 * @typedef {object} Service
 * @property {number}          id              - Identificador único del servicio
 * @property {string}          image           - Ruta a la imagen del servicio (ej: /images/services/piscina.webp)
 * @property {string}          color           - Color de acento para la barra del card (ej: #2C687B)
 * @property {string}          title           - Nombre del servicio
 * @property {string}          description     - Descripción corta del servicio
 * @property {string[]}        items           - Lista de parámetros incluidos en el análisis
 * @property {'popular'|'nuevo'|null} estado_servicio - Badge destacado sobre la imagen; null si no aplica
 */

/**
 * Crea una instancia normalizada de Service a partir de datos crudos.
 *
 * @param {object} raw - Objeto JSON crudo del backend o mock
 * @returns {Service}
 */
export function createService(raw = {}) {
  return {
    id: raw.id ?? 0,
    image: raw.image ?? '',
    color: raw.color ?? 'var(--color-primary)',
    title: raw.title ?? '',
    description: raw.description ?? '',
    items: Array.isArray(raw.items) ? raw.items : [],
    estado_servicio: raw.estado_servicio ?? null
  }
}

/**
 * Normaliza un array de servicios crudos.
 *
 * @param {object[]} rawList - Array de objetos JSON crudos
 * @returns {Service[]}
 */
export function createServiceList(rawList = []) {
  return rawList.map(createService)
}
