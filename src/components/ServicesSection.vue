<!--
  ServicesSection.vue - Sección de servicios del laboratorio.

  Muestra los 6 servicios en un carrusel horizontal infinito que:
  - Gira lentamente de forma continua (CSS animation)
  - Se pausa al posar el mouse sobre cualquier tarjeta
  - En mobile (≤ 768px) se apila verticalmente sin carrusel

  Cada tarjeta muestra:
  - Icono y título del servicio
  - Descripción del análisis
  - Lista de parámetros incluidos (con checks SVG)
  - Link "Solicitar análisis" hacia la sección de inscripción
  - Badge "Popular" en el servicio de agua potable

  Flujo de datos:
    Modelo Service (src/models/Service.js)
    → Mock MOCK_SERVICES (src/mocks/services.mock.js)
    → API getServices() (src/services/services.js)
    → Hook useServices() (src/hooks/useServices.js)
    → services: Service[]

  Estilos: _services.css (carrusel CSS, iconos, featured card, responsive)
  Clases globales: .section.section--alt, .container, .section-header (_layout.css),
    .section-label, .section-title, .section-subtitle (_typography.css),
    .card-base.card-base--lift-lg, .card-badge (_cards.css),
    .btn.btn--card-link (_buttons.css)
  Tokens: _variables.css
-->
<template>
  <section id="servicios" class="section section--alt services">
    <div class="container">
      <div class="section-header">
        <p class="section-label">Servicios</p>
        <h2 class="section-title">Soluciones analíticas especializadas</h2>
        <p class="section-subtitle">
          Análisis especializados para garantizar la calidad del agua en diferentes contextos y
          según la normatividad colombiana vigente.
        </p>
      </div>
    </div>

    <!-- Carrusel: fuera del container para ocupar el ancho completo -->
    <div
      ref="carouselRef"
      class="services-carousel"
      @mouseenter="onCarouselEnter"
      @mouseleave="onCarouselLeave"
      @mousemove="onCarouselMove"
    >
      <!-- Zonas de control: hover izq invierte, hover der acelera -->
      <div class="carousel-zone carousel-zone--left"></div>
      <div class="carousel-zone carousel-zone--right"></div>

      <!-- Pestañas indicadoras de dirección -->
      <button class="carousel-tab carousel-tab--left" :class="{ active: activeZone === 'left' }" aria-label="Mover a la izquierda">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="carousel-tab carousel-tab--right" :class="{ active: activeZone === 'right' }" aria-label="Mover a la derecha">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div class="carousel-viewport">
        <div ref="trackRef" class="services-track">
        <div
          class="card-base card-base--lift-lg service-card"
          v-for="(service, i) in carouselItems"
          :key="'s-' + i"
          :class="{ featured: service.id === 2 }"
        >
          <div class="card-header">
            <div class="card-icon-wrap" :class="'icon-' + ((service.id - 1) % 3)">
              <span class="card-icon">{{ service.icon }}</span>
            </div>
            <div class="card-badge" v-if="service.id === 2">Popular</div>
          </div>
          <h3>{{ service.title }}</h3>
          <p class="card-desc">{{ service.description }}</p>
          <ul>
            <li v-for="item in service.items" :key="item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ item }}
            </li>
          </ul>
          <a href="#inscribete" class="btn btn--card-link">
            Solicitar análisis
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
      </div>
    </div>

    <!-- Mobile: stack vertical (oculto en desktop/tablet) -->
    <div class="container services-mobile">
      <div
        class="card-base card-base--lift-lg service-card"
        v-for="service in services"
        :key="'m-' + service.id"
        :class="{ featured: service.id === 2 }"
      >
        <div class="card-header">
          <div class="card-icon-wrap" :class="'icon-' + ((service.id - 1) % 3)">
            <span class="card-icon">{{ service.icon }}</span>
          </div>
          <div class="card-badge" v-if="service.id === 2">Popular</div>
        </div>
        <h3>{{ service.title }}</h3>
        <p class="card-desc">{{ service.description }}</p>
        <ul>
          <li v-for="item in service.items" :key="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {{ item }}
          </li>
        </ul>
        <a href="#inscribete" class="btn btn--card-link">
          Solicitar análisis
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useServices } from '../hooks/useServices.js'
import { useScrollAnimations } from '../hooks/useScrollAnimations.js'
import { setupServicesAnimations } from '../animations'

const { services, loading, error } = useServices()

/**
 * Duplica el array de servicios para loop infinito.
 * Cuando el primer set sale por la izquierda, el segundo continúa.
 */
const carouselItems = computed(() => [...services.value, ...services.value])

/* ── Carrusel controlado por JS ── */
const carouselRef = ref(null)
const trackRef = ref(null)
const activeZone = ref(null)   // 'left' | 'right' | null (para iluminar la pestaña activa)

let offset = 0              // Posición actual en px
let speed = 0.4             // Velocidad base (px/frame)
let direction = 1           // 1 = izquierda (normal), -1 = derecha (reversa)
let rafId = null            // ID del requestAnimationFrame
let isHovering = false      // ¿El mouse está sobre el carrusel?
let hoverSpeed = 0.5        // Velocidad durante hover (zona izq/der)

/** Calcula el ancho de la mitad del track (un set completo de tarjetas) */
function getHalfWidth() {
  if (!trackRef.value) return 0
  return trackRef.value.scrollWidth / 2
}

/** Loop principal: mueve el track y hace wrap para efecto infinito */
function tick() {
  const currentSpeed = isHovering ? hoverSpeed : speed
  offset += currentSpeed * direction

  const half = getHalfWidth()
  if (half > 0) {
    // Wrap: si pasó la mitad, reinicia; si fue negativo, salta al final
    if (offset >= half) offset -= half
    if (offset < 0) offset += half
  }

  if (trackRef.value) {
    trackRef.value.style.transform = `translateX(-${offset}px)`
  }

  rafId = requestAnimationFrame(tick)
}

/** Detecta la zona del mouse: izq (18%) = reversa, der (18%) = avance, centro = pausa */
function onCarouselMove(e) {
  if (!carouselRef.value) return
  const rect = carouselRef.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width  // 0..1

  if (x < 0.18) {
    // Zona izquierda: invierte dirección
    direction = -1
    hoverSpeed = 2.5
  } else if (x > 0.82) {
    // Zona derecha: avance normal acelerado
    direction = 1
    hoverSpeed = 2.5
    activeZone.value = 'right'
  } else {
    // Centro: pausa
    hoverSpeed = 0
    activeZone.value = null
  }
}

function onCarouselEnter() { isHovering = true }
function onCarouselLeave() {
  isHovering = false
  direction = 1  // Restaura dirección normal al salir
  activeZone.value = null
}

/** Animaciones de scroll (header + carrusel fade-in) */
const anim = useScrollAnimations()

onMounted(() => {
  nextTick(() => {
    setupServicesAnimations(anim)
    rafId = requestAnimationFrame(tick)
  })
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>
