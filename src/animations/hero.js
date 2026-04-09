/**
 * hero.js - Animación de entrada de la sección Hero.
 *
 * Comportamiento:
 *   Al cargar la página, toda la sección hero aparece con un efecto
 *   blur-to-clear: inicia desenfocada (blur 20px) y en 2 segundos
 *   se aclara revelando todo el contenido (texto, tarjetas, fondo).
 *   Esta animación solo ocurre una vez al entrar a la página.
 *
 * Integración:
 *   Se llama desde HeroSection.vue → onMounted → setupHeroAnimations()
 */
import gsap from 'gsap'

export function setupHeroAnimations() {
  // Animación de entrada: blur → clear en 2 segundos
  gsap.fromTo(
    '.hero',
    { filter: 'blur(20px)', opacity: 0 },
    { filter: 'blur(0px)', opacity: 1, duration: 2, ease: 'power2.out' }
  )
}
