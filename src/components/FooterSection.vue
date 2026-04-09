<!--
  FooterSection.vue - Pie de página con información de contacto.

  Diseño estilo Oura con 4 columnas:
  1. Marca: logo, nombre, tagline y descripción
  2. Nuestra empresa: links de navegación interna
  3. Servicios: links directos a cada tipo de análisis
  4. Contacto: teléfono y correo con iconos SVG

  Incluye línea divisoria y barra inferior con copyright y links legales.

  Flujo de datos:
    Modelo Contact (src/models/Contact.js)
    → Mock MOCK_CONTACT (src/mocks/contact.mock.js)
    → API getContactInfo() (src/services/contact.js)
    → Hook useContact() (src/hooks/useContact.js)
    → contact: Contact

  Estilos: _footer.css (grid 4 columnas, brand, contact-list, responsive)
  Clases globales: .container (_layout.css)
  Tokens: _variables.css
-->
<template>
  <footer id="contacto" class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="footer-logo">
            <img src="/favicon.svg" alt="AGUAQUIM" class="footer-logo-img" />
            <div class="logo-brand">
              <span class="logo-text">
                <span class="logo-agua">AGUA</span><span class="logo-quim">QUIM</span>
              </span>
              <span class="logo-subtitle">LABORATORIO</span>
            </div>
          </div>
          <p class="footer-tagline">Laboratorio de Análisis de Agua</p>
          <p class="footer-desc">
            Calidad y confianza en cada muestra. Análisis fisicoquímico y
            microbiológico certificado.
          </p>
        </div>

        <div class="footer-col">
          <h4>Nuestra empresa</h4>
          <ul>
            <li><a href="#quienes-somos">Quiénes somos</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#cobertura">Cobertura</a></li>
            <li><a href="#inscribete">Inscríbete</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Servicios</h4>
          <ul>
            <li><a href="#servicios">Análisis de Piscina</a></li>
            <li><a href="#servicios">Agua Potable</a></li>
            <li><a href="#servicios">Parámetros IRCA</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contacto</h4>
          <ul class="contact-list">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a :href="'tel:+57' + contact?.phone">{{ contact?.phoneFormatted || '317 769 8439' }}</a>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a :href="'mailto:' + contact?.email">{{ contact?.email || 'aguaquimlaboratorio@gmail.com' }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} AGUAQUIM Laboratorio. Todos los derechos reservados.</p>
        <div class="footer-bottom-links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos y Condiciones</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import { useContact } from '../hooks/useContact.js'
import { useScrollAnimations } from '../hooks/useScrollAnimations.js'
import { setupFooterAnimations } from '../animations'

// Año actual calculado dinámicamente para el copyright del footer
const currentYear = new Date().getFullYear()

/**
 * Consume la información de contacto desde el composable.
 * El teléfono y correo se renderizan dinámicamente.
 */
const { contact } = useContact()

/**
 * Inicializa las animaciones del footer.
 * Usa revealOnce: aparece al scroll, permanece visible al llegar al fondo.
 */
const anim = useScrollAnimations()
onMounted(() => nextTick(() => setupFooterAnimations(anim)))
</script>
