/**
 * about.js - Animaciones de la sección "Quiénes Somos".
 *
 * Elementos animados:
 *   .about .section-header → Label "NUESTRA EMPRESA" + título "Quiénes Somos"
 *   .about-text            → Párrafos descriptivos y link "Inscríbete" (izquierda)
 *   .value-card            → Tarjetas numeradas 01, 02, 03 (derecha)
 *
 * Comportamiento:
 *   1. Al hacer scroll, primero aparece el header de la sección (centrado)
 *   2. Luego aparece el bloque de texto de la izquierda
 *   3. Cada value-card aparece INDIVIDUALMENTE conforme se scrollea,
 *      porque se usa fadeIn() que crea un ScrollTrigger por elemento.
 *      Esto permite que las 3 cards aparezcan una debajo de la otra
 *      a medida que el usuario baja, en vez de todas a la vez.
 *
 * Integración:
 *   Se llama desde AboutSection.vue → onMounted → setupAboutAnimations(anim)
 *
 * @param {Object} anim - Instancia de useScrollAnimations() { fadeIn, batchIn, revealOnce }
 */
export function setupAboutAnimations({ fadeIn }) {
  // Header centrado de la sección
  fadeIn('.about .section-header')

  // Bloque de texto descriptivo (columna izquierda)
  fadeIn('.about-text')

  // Cards 01, 02, 03: cada una con su propio trigger individual
  // para que aparezcan 1 a 1 al hacer scroll, no todas juntas
  fadeIn('.value-card', { y: 30, start: 'top 92%' })
}
