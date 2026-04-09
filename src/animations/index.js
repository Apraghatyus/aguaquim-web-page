/**
 * animations/index.js - Barrel export de todos los módulos de animación.
 *
 * Estructura:
 *   Cada sección de la landing page tiene su propio módulo de animación
 *   que exporta una función setup*Animations(anim).
 *
 *   El parámetro 'anim' es el objeto { fadeIn, batchIn, revealOnce }
 *   retornado por useScrollAnimations() (src/hooks/useScrollAnimations.js).
 *
 * Flujo:
 *   Componente.vue
 *     → import { setupXxxAnimations } from '../animations'
 *     → const anim = useScrollAnimations()
 *     → onMounted(() => setupXxxAnimations(anim))
 *
 * Agregar nuevas animaciones:
 *   1. Crear src/animations/nueva-seccion.js
 *   2. Exportar setupNuevaSeccionAnimations({ fadeIn, batchIn, revealOnce })
 *   3. Re-exportar aquí
 *   4. Importar y llamar desde el componente correspondiente
 */
export { setupHeroAnimations } from './hero.js'
export { setupAboutAnimations } from './about.js'
export { setupServicesAnimations } from './services.js'
export { setupCoverageAnimations } from './coverage.js'
export { setupSignupAnimations } from './signup.js'
export { setupFooterAnimations } from './footer.js'
