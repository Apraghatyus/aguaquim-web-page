/**
 * signup.js - Animaciones de la sección "Inscríbete".
 *
 * Elementos animados:
 *   .signup-card → Tarjeta CTA grande con fondo primary (WhatsApp + email)
 *
 * Comportamiento:
 *   La tarjeta completa aparece como un único bloque con fadeIn.
 *   No se animan sus hijos por separado porque la tarjeta es una
 *   unidad visual cohesiva (textos + botones + badge decorativo).
 *
 * Integración:
 *   Se llama desde SignupSection.vue → onMounted → setupSignupAnimations(anim)
 *
 * @param {Object} anim - Instancia de useScrollAnimations() { fadeIn, batchIn, revealOnce }
 */
export function setupSignupAnimations({ fadeIn }) {
  // Tarjeta CTA completa: aparece como un solo bloque
  fadeIn('.signup-card')
}
