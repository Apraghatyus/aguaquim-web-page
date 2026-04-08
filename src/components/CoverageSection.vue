<!--
  CoverageSection.vue - Sección de cobertura geográfica.

  Muestra las 7 ciudades donde AGUAQUIM presta servicio:
  Cali, Jamundí, Yumbo, Palmira, Buga, Candelaria y Santander de Quilichao.

  - Layout asimétrico: texto descriptivo a la izquierda, grid de ciudades a la derecha
  - Cada ciudad tiene icono de ubicación SVG y departamento
  - Estadística destacada: "7 ciudades con cobertura"

  Flujo de datos:
    Modelo City (src/models/City.js)
    → Mock MOCK_CITIES (src/mocks/coverage.mock.js)
    → API getCities() (src/services/coverage.js)
    → Hook useCoverage() (src/hooks/useCoverage.js)
    → cities: City[], totalCities: number

  Estilos: _coverage.css (layout asimétrico, city-card, stat, responsive)
  Clases globales: .section, .container (_layout.css),
    .section-label, .section-title, .section-desc (_typography.css),
    .card-base.card-base--lift-sm (_cards.css)
  Tokens: _variables.css
-->
<template>
  <section id="cobertura" class="section coverage">
    <div class="container">
      <div class="coverage-layout">
        <div class="coverage-text">
          <p class="section-label">Cobertura</p>
          <h2 class="section-title">Presentes en tu ciudad</h2>
          <p class="section-desc coverage-desc">
            Prestamos nuestros servicios de análisis de agua en las principales
            ciudades del <strong>Valle del Cauca</strong> y norte del <strong>Cauca</strong>.
            Cobertura estratégica para atender a tu empresa donde la necesites.
          </p>
          <div class="coverage-stat">
            <span class="stat-number">{{ totalCities }}</span>
            <span class="stat-label">Ciudades<br />con cobertura</span>
          </div>
        </div>
        <div class="cities-grid">
          <div
            class="card-base card-base--lift-sm city-card"
            v-for="(city, i) in cities"
            :key="city.name"
            :style="{ animationDelay: i * 0.05 + 's' }"
          >
            <div class="city-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <h3>{{ city.name }}</h3>
              <p>{{ city.dept }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCoverage } from '../hooks/useCoverage.js'

/**
 * Consume las ciudades de cobertura desde el composable.
 * totalCities se calcula automáticamente del array para la estadística.
 */
const { cities, totalCities, loading, error } = useCoverage()
</script>
