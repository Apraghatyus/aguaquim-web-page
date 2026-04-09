/**
 * services.js - Animaciones de la sección "Servicios".
 *
 * Elementos animados:
 *   .services .section-header → Label, título y subtítulo de la sección
 *   .services-carousel         → El carrusel completo aparece con fadeIn
 *   .services-mobile .service-card → Tarjetas en mobile (stack) con batchIn
 *
 * Comportamiento:
 *   1. El header aparece primero con fadeIn individual
 *   2. El carrusel aparece como bloque entero (fadeIn)
 *   3. En mobile, las tarjetas apiladas aparecen escalonadas (batchIn)
 *
 * Integración:
 *   Se llama desde ServicesSection.vue → onMounted → setupServicesAnimations(anim)
 *
 * @param {Object} anim - Instancia de useScrollAnimations() { fadeIn, batchIn, revealOnce }
 */
export function setupServicesAnimations({ fadeIn, batchIn }) {
  // Header de la sección (label + título + subtítulo)
  fadeIn('.services .section-header')

  // Carrusel: aparece como bloque entero
  fadeIn('.services-carousel')

  // Mobile: tarjetas apiladas con stagger escalonado
  batchIn('.services-mobile .service-card', { stagger: 0.1 })
}
