/**
 * services.js - Animaciones de la sección "Servicios".
 *
 * Elementos animados:
 *   .services .section-header → Label, título y subtítulo de la sección
 *   .service-card             → Las 3 tarjetas de servicio (Piscina, Potable, IRCA)
 *
 * Comportamiento:
 *   1. El header aparece primero con fadeIn individual
 *   2. Las tarjetas aparecen como grupo escalonado (batchIn con stagger 0.1s)
 *      Es decir, cuando el grupo entra al viewport, aparecen una tras otra
 *      con 100ms de diferencia. Esto funciona bien en grid de 3 columnas
 *      porque todas están a la misma altura.
 *
 * Integración:
 *   Se llama desde ServicesSection.vue → onMounted → setupServicesAnimations(anim)
 *
 * @param {Object} anim - Instancia de useScrollAnimations() { fadeIn, batchIn, revealOnce }
 */
export function setupServicesAnimations({ fadeIn, batchIn }) {
  // Header de la sección (label + título + subtítulo)
  fadeIn('.services .section-header')

  // Tarjetas de servicio: grupo escalonado con stagger
  batchIn('.service-card', { stagger: 0.1 })
}
