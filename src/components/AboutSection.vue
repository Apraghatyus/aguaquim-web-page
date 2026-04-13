<!--
  AboutSection.vue - Sección "Quiénes Somos".

  Presenta al laboratorio AGUAQUIM con:
  - Descripción de la empresa y su misión
  - Link de inscripción con icono animado
  - Tarjetas numeradas (01, 02) con Misión y Visión

  Layout de 2 columnas: texto a la izquierda, valores a la derecha.

  Flujo de datos:
    Modelo CompanyValue (src/models/CompanyValue.js)
    → Mock MOCK_VALUES (src/mocks/about.mock.js)
    → API getCompanyValues() (src/services/about.js)
    → Hook useAbout() (src/hooks/useAbout.js)
    → values: CompanyValue[]

  Estilos: _about.css (grid 2 columnas, value-card, responsive)
  Clases globales: .section, .container, .section-header (_layout.css),
    .section-label, .section-title (_typography.css),
    .btn.btn--link (_buttons.css),
    .card-base.card-base--lift-sm (_cards.css)
  Tokens: _variables.css
-->
<template>
  <section id="quienes-somos" class="section about">
    <div class="container">
      <div class="section-header">
        <p class="section-label">Nuestra empresa</p>
        <h2 class="section-title">Quiénes Somos</h2>
      </div>
      <div class="about-content">
        <div class="about-text">
          <p class="lead">
            Somos una empresa 100% colombiana conformada por un equipo de
            profesionales en Química, Ingeniería Química, Agrícola y Agronomía,
            comprometidos con una excelente calidad en la prestación de nuestros
            servicios, los cuales están basados en los requerimientos establecidos
            por las normas colombianas.
          </p>
          <p>
            Contamos con personal idóneo e infraestructura adecuada para
            garantizar la confiabilidad y trazabilidad en los resultados de los
            análisis, estamos comprometidos con la mejora continua, la calidad
            y el medio ambiente.
          </p>
          <a href="#inscribete" class="btn btn--link">
            Contáctanos
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </a>
        </div>
        <div class="about-values">
          <div class="card-base card-base--lift-sm value-card" v-for="(value, i) in values" :key="value.title">
            <div class="value-number">0{{ i + 1 }}</div>
            <div>
              <h3>{{ value.title }}</h3>
              <p>{{ value.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useAbout } from '../hooks/useAbout.js'
import { useScrollAnimations } from '../hooks/useScrollAnimations.js'
import { setupAboutAnimations } from '../animations'

/**
 * Consume los valores/pilares de la empresa desde el composable.
 * Se muestran como tarjetas numeradas (01, 02, 03).
 */
const { values, loading, error } = useAbout()

/**
 * Inicializa las animaciones de la sección About.
 * Header y texto aparecen primero, luego cada value-card individual.
 */
const anim = useScrollAnimations()
onMounted(() => nextTick(() => setupAboutAnimations(anim)))
</script>
