<!--
  HeroSection.vue - Sección principal (hero) de la landing page.

  Es lo primero que ve el visitante al entrar. Incluye:
  - Título grande con texto en gradiente (colores de marca)
  - Subtítulo descriptivo del laboratorio
  - Botones CTA (Call to Action) hacia servicios e inscripción
  - Tarjetas decorativas flotantes que simulan un dashboard de calidad
  - Formas de fondo con blur para efecto visual moderno

  Estilos: _hero.css (layout grid, tarjetas flotantes, formas blur, responsive)
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
          <a href="#inscribete" class="btn btn--secondary">Inscríbete</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="visual-card card-main">
          <div class="card-icon">💧</div>
          <div class="card-label">Calidad del Agua</div>
          <div class="card-value">99.8%</div>
          <div class="card-sub">Índice de confiabilidad</div>
        </div>
        <div class="visual-card card-secondary">
          <div class="card-row">
            <span class="dot dot-green"></span>
            <span>pH óptimo</span>
          </div>
          <div class="card-row">
            <span class="dot dot-green"></span>
            <span>Libre de coliformes</span>
          </div>
          <div class="card-row">
            <span class="dot dot-green"></span>
            <span>Cloro residual OK</span>
          </div>
        </div>
        <div class="visual-card card-accent">
          <div class="card-accent-icon">🏊</div>
          <div>
            <div class="card-accent-title">Análisis Piscina</div>
            <div class="card-accent-sub">Resultados en 48h</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
