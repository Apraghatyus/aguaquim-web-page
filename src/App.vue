<!--
  App.vue - Layout raíz de la aplicación AGUAQUIM.

  Contiene los elementos persistentes (NavBar + Footer) que aparecen
  en TODAS las páginas. El contenido de cada página se renderiza
  dentro de <RouterView /> (ver src/router/index.js).

  Gestiona el estado global del tema claro/oscuro (dark mode):
  - Persiste la preferencia en localStorage ('aguaquim-theme')
  - Aplica data-theme="dark|light" en <html>
  - Respeta prefers-color-scheme del SO en la primera visita

  Arquitectura de datos:
    Modelos (src/models/) → Mocks (src/mocks/) → Services (src/services/)
    → Hooks (src/hooks/) → Componentes (src/components/)

  Estilos: main.css importa 13 parciales CSS (sin <style> en .vue)
-->
<template>
  <NavBar :isDark="isDark" @toggleTheme="toggleTheme" />
  <RouterView />
  <FooterSection />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { RouterView } from 'vue-router'

import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
}

watch(isDark, (val) => {
  document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light')
  localStorage.setItem('aguaquim-theme', val ? 'dark' : 'light')
})

onMounted(() => {
  const saved = localStorage.getItem('aguaquim-theme')
  if (saved === 'dark') {
    isDark.value = true
  } else if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
  }
})
</script>
