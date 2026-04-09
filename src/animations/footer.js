/**
 * footer.js - Animaciones del pie de página.
 *
 * Elementos animados:
 *   .footer-brand → Columna de marca (logo, tagline, descripción)
 *   .footer-col   → Columnas de links (empresa, servicios, contacto)
 *
 * Comportamiento:
 *   Usa revealOnce() en vez de fadeIn/batchIn porque el footer
 *   está al fondo de la página. Si usáramos fadeIn, las columnas
 *   desaparecerían al llegar al fondo (onLeave) y quedaría vacío.
 *
 *   Con revealOnce():
 *   - Al hacer scroll hacia abajo → aparecen con stagger
 *   - Al llegar al fondo → PERMANECEN visibles (no hay onLeave)
 *   - Al hacer scroll hacia arriba → desaparecen (onLeaveBack)
 *
 * Integración:
 *   Se llama desde FooterSection.vue → onMounted → setupFooterAnimations(anim)
 *
 * @param {Object} anim - Instancia de useScrollAnimations() { fadeIn, batchIn, revealOnce }
 */
export function setupFooterAnimations({ revealOnce }) {
  // Marca + columnas: grupo con stagger, permanece visible al fondo
  revealOnce('.footer-brand, .footer-col')
}
