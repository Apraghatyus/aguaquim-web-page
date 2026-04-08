/**
 * Configuración de Vite para AGUAQUIM Web Page.
 *
 * Vite es el bundler/dev-server que compila los archivos Vue/JS/CSS.
 * - En desarrollo: levanta un servidor con Hot Module Replacement (HMR)
 *   para ver cambios en tiempo real sin recargar la página.
 * - En producción (npm run build): genera archivos estáticos optimizados
 *   en la carpeta /dist listos para servir con Nginx.
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Plugin oficial de Vue para que Vite entienda archivos .vue
  plugins: [vue()],

  server: {
    // host '0.0.0.0' permite acceso desde fuera del contenedor Docker
    // (por defecto Vite solo escucha en localhost)
    host: '0.0.0.0',
    // Puerto del servidor de desarrollo
    port: 5173,

    // Proxy para evitar CORS en desarrollo.
    // Las peticiones a /api se reenvían al backend real.
    // El navegador las ve como same-origin → sin errores CORS.
    proxy: {
      '/api': {
        target: 'http://localhost:8000',  // Puerto del backend local
        changeOrigin: true,               // Cambia el header Origin al del target
        rewrite: (path) => path.replace(/^\/api/, ''),  // /api/servicios → /servicios
        secure: false                     // Permite backend con HTTP (sin SSL)
      }
    }
  },

  // Configuración de Vitest (testing)
  test: {
    // Usa jsdom para simular el DOM del navegador
    environment: 'jsdom',
    // Archivos de test: *.test.js o *.spec.js en la carpeta tests/
    include: ['tests/**/*.{test,spec}.js'],
    // Variables globales de test (describe, it, expect) sin importar
    globals: true
  }
})
