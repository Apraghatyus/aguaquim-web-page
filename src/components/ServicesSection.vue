<!--
  ServicesSection.vue - Sección de servicios del laboratorio.

  Muestra los 3 servicios principales en tarjetas con:
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

  Estilos: _services.css (grid 3 columnas, iconos, featured card, responsive)
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
      <div class="services-grid">
        <div
          class="card-base card-base--lift-lg service-card"
          v-for="(service, i) in services"
          :key="service.title"
          :class="{ featured: i === 1 }"
        >
          <div class="card-header">
            <div class="card-icon-wrap" :class="'icon-' + i">
              <span class="card-icon">{{ service.icon }}</span>
            </div>
            <div class="card-badge" v-if="i === 1">Popular</div>
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
  </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useServices } from '../hooks/useServices.js'
import { useScrollAnimations } from '../hooks/useScrollAnimations.js'
import { setupServicesAnimations } from '../animations'

/**
 * Consume los servicios del laboratorio desde el composable.
 * Los datos se cargan automáticamente al montar el componente.
 * Si hay backend disponible, se obtienen de la API.
 * Si no, se usan los datos estáticos de fallback.
 */
const { services, loading, error } = useServices()

/**
 * Inicializa las animaciones de la sección Servicios.
 * Header primero, luego tarjetas con stagger escalonado.
 */
const anim = useScrollAnimations()
onMounted(() => nextTick(() => setupServicesAnimations(anim)))
</script>
