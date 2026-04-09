/**
 * coverage.js - Animaciones de la sección "Cobertura".
 *
 * Elementos animados:
 *   .coverage-text → Bloque izquierdo: label, título, descripción y estadística
 *   .city-card     → Grid de tarjetas de ciudad (Cali, Jamundí, Yumbo, etc.)
 *
 * Comportamiento:
 *   1. El bloque de texto aparece primero como un solo elemento (fadeIn)
 *   2. Las city-cards aparecen como grupo escalonado rápido (stagger 0.06s)
 *      El stagger es corto porque hay 7 ciudades y no queremos
 *      que la animación total sea larga.
 *
 * Integración:
 *   Se llama desde CoverageSection.vue → onMounted → setupCoverageAnimations(anim)
 *
 * @param {Object} anim - Instancia de useScrollAnimations() { fadeIn, batchIn, revealOnce }
 */
export function setupCoverageAnimations({ fadeIn, batchIn }) {
  // Bloque de texto: título + descripción + estadística "7 ciudades"
  fadeIn('.coverage-text')

  // Grid de ciudades: grupo escalonado rápido
  batchIn('.city-card', { y: 20, stagger: 0.06 })
}
