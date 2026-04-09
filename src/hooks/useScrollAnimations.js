/**
 * useScrollAnimations - Motor central de animaciones de scroll con GSAP.
 *
 * Provee funciones primitivas que los módulos de animación
 * (src/animations/*.js) consumen para animar elementos al scroll.
 *
 * Uso desde un componente:
 *   import { useScrollAnimations } from '../hooks/useScrollAnimations.js'
 *   import { setupHeroAnimations } from '../animations/hero.js'
 *
 *   const anim = useScrollAnimations()
 *   onMounted(() => setupHeroAnimations(anim))
 *
 * Funciones disponibles:
 *   fadeIn()     → Elemento individual: aparece/desaparece al entrar/salir
 *   batchIn()    → Grupo de elementos: aparecen con stagger escalonado
 *   revealOnce() → Elementos que aparecen y quedan visibles al fondo (footer)
 */
import { onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  const triggers = []

  /**
   * fadeIn - Anima UN elemento individual con fade + slide-up.
   *
   * Comportamiento:
   *   - Al entrar al viewport → opacity 0→1, y→0 (aparece)
   *   - Al salir por arriba → opacity 1→0 (desaparece)
   *   - Al salir por abajo → opacity 1→0 (desaparece)
   *   - Al volver a entrar → reaparece
   *
   * Cada elemento que coincida con el selector recibe su PROPIO
   * ScrollTrigger, así se activan individualmente según su posición.
   *
   * @param {string} selector - Selector CSS del/los elemento(s).
   * @param {Object} [opts] - Opciones.
   * @param {number} [opts.y=25] - Desplazamiento vertical inicial (px).
   * @param {number} [opts.duration=0.5] - Duración de aparición (s).
   * @param {string} [opts.start='top 90%'] - Cuándo se activa el trigger.
   */
  function fadeIn(selector, opts = {}) {
    const { y = 25, duration = 0.5, start = 'top 90%' } = opts

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    elements.forEach((el) => {
      gsap.set(el, { opacity: 0, y })

      const st = ScrollTrigger.create({
        trigger: el,
        start,
        onEnter: () =>
          gsap.to(el, { opacity: 1, y: 0, duration, ease: 'power2.out' }),
        onLeave: () =>
          gsap.to(el, { opacity: 0, y: -15, duration: duration * 0.5, ease: 'power2.in' }),
        onEnterBack: () =>
          gsap.to(el, { opacity: 1, y: 0, duration, ease: 'power2.out' }),
        onLeaveBack: () =>
          gsap.to(el, { opacity: 0, y, duration: duration * 0.5, ease: 'power2.in' }),
      })

      triggers.push(st)
    })
  }

  /**
   * batchIn - Anima un GRUPO de elementos con stagger escalonado.
   *
   * Comportamiento:
   *   - Cuando un lote entra al viewport → aparecen con delay entre cada uno
   *   - Al salir → desaparecen como grupo
   *
   * Ideal para grids de cards, listas de ciudades, etc.
   *
   * @param {string} selector - Selector CSS del grupo de elementos.
   * @param {Object} [opts] - Opciones.
   * @param {number} [opts.y=30] - Desplazamiento vertical inicial (px).
   * @param {number} [opts.duration=0.5] - Duración por elemento (s).
   * @param {number} [opts.stagger=0.1] - Delay entre cada elemento (s).
   * @param {string} [opts.start='top 90%'] - Cuándo se activa el trigger.
   */
  function batchIn(selector, opts = {}) {
    const { y = 30, duration = 0.5, stagger = 0.1, start = 'top 90%' } = opts

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    gsap.set(elements, { opacity: 0, y })

    const trigger = ScrollTrigger.batch(elements, {
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration, stagger, ease: 'power2.out', overwrite: true }),
      onLeave: (batch) =>
        gsap.to(batch, { opacity: 0, y: -15, duration: duration * 0.5, stagger: stagger * 0.5, ease: 'power2.in', overwrite: true }),
      onEnterBack: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration, stagger, ease: 'power2.out', overwrite: true }),
      onLeaveBack: (batch) =>
        gsap.to(batch, { opacity: 0, y, duration: duration * 0.5, stagger: stagger * 0.5, ease: 'power2.in', overwrite: true }),
      start,
    })

    triggers.push(...(Array.isArray(trigger) ? trigger : [trigger]))
  }

  /**
   * revealOnce - Anima elementos que quedan visibles permanentemente.
   *
   * Comportamiento:
   *   - Al entrar al viewport → aparecen con stagger
   *   - Al llegar al fondo de la página → permanecen visibles (NO desaparecen)
   *   - Al hacer scroll hacia arriba → SÍ desaparecen (onLeaveBack)
   *
   * Diseñado para el footer y elementos al final de la página
   * que no deben desaparecer cuando el usuario llega al fondo.
   *
   * @param {string} selector - Selector CSS de los elementos.
   * @param {Object} [opts] - Opciones.
   * @param {number} [opts.y=25] - Desplazamiento vertical inicial (px).
   * @param {number} [opts.duration=0.5] - Duración por elemento (s).
   * @param {number} [opts.stagger=0.08] - Delay entre elementos (s).
   * @param {string} [opts.start='top 95%'] - Cuándo se activa el trigger.
   */
  function revealOnce(selector, opts = {}) {
    const { y = 25, duration = 0.5, stagger = 0.08, start = 'top 95%' } = opts

    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    gsap.set(elements, { opacity: 0, y })

    const trigger = ScrollTrigger.batch(elements, {
      onEnter: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, duration, stagger, ease: 'power2.out', overwrite: true }),
      onLeaveBack: (batch) =>
        gsap.to(batch, { opacity: 0, y, duration: duration * 0.6, stagger: stagger * 0.5, ease: 'power2.in', overwrite: true }),
      start,
    })

    triggers.push(...(Array.isArray(trigger) ? trigger : [trigger]))
  }

  // Limpia todos los ScrollTriggers al desmontar el componente
  onUnmounted(() => {
    triggers.forEach((t) => t.kill())
    triggers.length = 0
  })

  return { fadeIn, batchIn, revealOnce }
}
