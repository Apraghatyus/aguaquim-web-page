<!--
  HomePage.vue - Vista principal (landing page).

  Ensambla todas las secciones de la home en orden.
  Cada sección es un componente independiente que consume datos
  a través de su propio hook (useServices, useCoverage, etc.).
  Los datos fluyen: Modelo → Mock → Service → Hook → Componente.

  Carga lazy vía Vue Router (src/router/index.js).
-->
<template>
  <HeroSection />
  <AboutSection />
  <ServicesSection />
  <CoverageSection />
  <SignupSection />
</template>

<script setup>
/**
 * HomePage solo ensambla secciones.
 * Cada componente gestiona sus propias animaciones internamente
 * importando su módulo desde src/animations/.
 */
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import CoverageSection from '../components/CoverageSection.vue'
import SignupSection from '../components/SignupSection.vue'
</script>
