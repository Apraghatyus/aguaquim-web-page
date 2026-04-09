<!--
  NavBar.vue - Barra de navegación fija con efecto glassmorphism.

  Funcionalidades:
  - Fija en la parte superior (position: fixed) con fondo transparente
  - Al hacer scroll (>50px), aplica fondo con desenfoque (backdrop-filter)
  - Botón de toggle para cambiar entre modo claro/oscuro (luna/sol)
  - Menú hamburguesa responsive para pantallas < 900px
  - Links con animación de subrayado al hover

  Estilos: _navbar.css (layout, glassmorphism, hamburguesa, responsive)
  Clases globales: .btn.btn--cta (_buttons.css)
  Tokens: _variables.css
-->
<template>
  <!-- La clase 'scrolled' se aplica dinámicamente al hacer scroll -->
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <a href="#" class="navbar-logo">
        <img src="/favicon.svg" alt="AGUAQUIM" class="logo-img" />
        <div class="logo-brand">
          <span class="logo-text">
            <span class="logo-agua">AGUA</span><span class="logo-quim">QUIM</span>
          </span>
          <span class="logo-subtitle">LABORATORIO</span>
        </div>
      </a>

      <!-- Links de navegación - en móvil se muestran a pantalla completa -->
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li><a href="#inicio" @click="menuOpen = false">Inicio</a></li>
        <li><a href="#quienes-somos" @click="menuOpen = false">Quiénes Somos</a></li>
        <li><a href="#servicios" @click="menuOpen = false">Servicios</a></li>
        <li><a href="#cobertura" @click="menuOpen = false">Cobertura</a></li>
        <li><a href="#contacto" @click="menuOpen = false">Contacto</a></li>
      </ul>

      <div class="nav-actions">
        <!-- Botón dark mode: muestra icono de luna (claro) o sol (oscuro) -->
        <!-- Emite evento 'toggleTheme' al padre (App.vue) para cambiar el tema -->
        <button class="theme-toggle" @click="$emit('toggleTheme')" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
          <!-- Icono luna: se muestra cuando el tema actual es claro -->
          <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <!-- Icono sol: se muestra cuando el tema actual es oscuro -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </button>
        <a href="#inscribete" class="btn btn--cta">Inscríbete</a>
        <!-- Menú hamburguesa: solo visible en pantallas < 900px -->
        <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Menú">
          <span class="bar" :class="{ active: menuOpen }"></span>
          <span class="bar" :class="{ active: menuOpen }"></span>
          <span class="bar" :class="{ active: menuOpen }"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props recibidas del componente padre (App.vue)
defineProps({
  isDark: Boolean  // Estado actual del tema: true = oscuro, false = claro
})

// Eventos que este componente puede emitir al padre
defineEmits(['toggleTheme'])

// Estado reactivo: controla si el navbar tiene fondo al hacer scroll
const isScrolled = ref(false)
// Estado reactivo: controla si el menú móvil está abierto
const menuOpen = ref(false)

/**
 * Verifica la posición del scroll para aplicar el efecto de fondo al navbar.
 * Cuando el usuario baja más de 50px, el navbar cambia de transparente a
 * fondo con desenfoque (glassmorphism).
 */
function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

// Registra el listener de scroll al montar el componente
onMounted(() => window.addEventListener('scroll', handleScroll))
// Elimina el listener al desmontar para evitar memory leaks
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>
