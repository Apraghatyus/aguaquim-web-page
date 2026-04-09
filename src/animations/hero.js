/**
 * hero.js - Animaciones de la sección Hero.
 *
 * Elementos animados:
 *   .hero-text    → Título, descripción y botones CTA (columna izquierda)
 *   .hero-visual  → Tarjetas flotantes decorativas (columna derecha)
 *
 * Comportamiento:
 *   El hero es lo primero que ve el usuario al cargar la página.
 *   Se usa un trigger alto (top 95%) para que aparezca casi inmediato.
 *   El texto aparece primero (0.6s), las tarjetas un poco después (0.7s).
 *   Al hacer scroll hacia abajo y salir del viewport, desaparecen.
 *
 * Integración:
 *   Se llama desde HeroSection.vue → onMounted → setupHeroAnimations(anim)
 *   donde 'anim' es el objeto retornado por useScrollAnimations().
 *
 * @param {Object} anim - Instancia de useScrollAnimations() { fadeIn, batchIn, revealOnce }
 */
export function setupHeroAnimations({ fadeIn }) {
  // Texto principal: fade-in rápido al cargar (el hero ya está en viewport)
  fadeIn('.hero-text', { y: 20, duration: 0.6, start: 'top 95%' })

  // Tarjetas decorativas: aparecen ligeramente después
  fadeIn('.hero-visual', { y: 30, duration: 0.7, start: 'top 95%' })
}
