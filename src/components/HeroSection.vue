<!--
  HeroSection.vue - Sección principal (hero) de la landing page.

  Es lo primero que ve el visitante al entrar. Incluye:
  - Título grande con texto en gradiente (colores de marca)
  - Subtítulo descriptivo del laboratorio
  - Botones CTA (Call to Action) hacia servicios e inscripción
  - Slideshow rotativo de fotos del equipo AGUAQUIM
  - Formas de fondo con blur para efecto visual moderno

  Estilos: _hero.css (layout grid, slideshow, formas blur, responsive)
  Clases globales: .text-gradient (_typography.css),
    .btn.btn--primary, .btn.btn--secondary (_buttons.css)
  Tokens: _variables.css
-->
<template>
  <section id="inicio" class="hero">
    <!-- Formas decorativas de fondo con efecto blur -->
    <div class="hero-bg">
      <div class="hero-shape shape-1"></div>
      <div class="hero-shape shape-2"></div>
      <div class="hero-shape shape-3"></div>
    </div>
    <div class="hero-container">
      <div class="hero-text">
        <p class="hero-label">Laboratorio Certificado</p>
        <h1>
          Calidad,<br />
          <span class="text-gradient">precisión</span><br />
          y confianza
        </h1>
        <p class="hero-description">
          Análisis fisicoquímico y microbiológico del agua con los más altos
          estándares. Piscinas, agua potable y parámetros IRCA.
        </p>
        <div class="hero-actions">
          <a href="#servicios" class="btn btn--primary">
            Conoce nuestros servicios
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="#inscribete" class="btn btn--secondary">Contáctanos</a>
        </div>
      </div>
      <!-- Slideshow rotativo del equipo AGUAQUIM -->
      <div class="hero-slideshow">
        <img
          v-for="(img, i) in teamImages"
          :key="img"
          :src="img"
          :alt="'Equipo AGUAQUIM ' + (i + 1)"
          class="hero-slide"
          :class="{ active: currentSlide === i }"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { setupHeroAnimations } from '../animations'

/*
 * Imágenes del slideshow del equipo.
 *
 * Ubicación: public/images/team/
 * Formato: PNG con fondo transparente, resolución recomendada ~800x600px.
 * Nomenclatura: team-1.png, team-2.png, team-3.png, team-4.png, ...
 *
 * Para agregar más imágenes:
 *   1. Colocar el archivo .png en public/images/team/
 *   2. Añadir la ruta al array teamImages abajo
 *   El slideshow y el intervalo se adaptan automáticamente
 *   al tamaño del array (usa teamImages.length para el ciclo).
 */
const teamImages = [
  '/images/team/team-1.png',
  '/images/team/team-2.png',
  '/images/team/team-3.png',
]

const currentSlide = ref(0)
let interval = null

onMounted(() => {
  nextTick(() => setupHeroAnimations())

  // Rotar imágenes cada 4 segundos
  interval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % teamImages.length
  }, 4000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
