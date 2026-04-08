# =============================================================================
# Dockerfile Multi-Stage para AGUAQUIM Web Page
#
# Este archivo define 3 etapas (stages) de construcción:
#   1. dev        → Servidor de desarrollo con hot-reload (Vite)
#   2. build      → Compila los archivos estáticos optimizados
#   3. production → Sirve los archivos estáticos con Nginx
#
# Uso:
#   Desarrollo:  docker compose up --build
#   Producción:  docker compose -f docker-compose.prod.yml up --build
# =============================================================================

# --- Stage 1: Development ---
# Usa Node.js 20 Alpine (imagen ligera ~50MB) para el entorno de desarrollo.
# Ejecuta el servidor Vite con HMR (Hot Module Replacement) para que los
# cambios en el código se reflejen instantáneamente en el navegador.
FROM node:20-alpine AS dev
WORKDIR /app
# Copia primero solo package.json para aprovechar la caché de Docker.
# Si las dependencias no cambian, Docker reutiliza esta capa.
COPY package.json package-lock.json* ./
RUN npm install
# Copia el resto del código fuente
COPY . .
# Puerto del servidor de desarrollo Vite
EXPOSE 5173
CMD ["npm", "run", "dev"]

# --- Stage 2: Build ---
# Compila la aplicación Vue en archivos estáticos optimizados (HTML, CSS, JS)
# que se guardan en /app/dist. Esta etapa es intermedia y no se despliega.
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
# Ejecuta 'vite build' que genera los archivos minificados en /app/dist
RUN npm run build

# --- Stage 3: Production (Nginx) ---
# Imagen final ultra-ligera (~25MB). Solo contiene Nginx y los archivos
# estáticos compilados. No incluye Node.js ni node_modules.
FROM nginx:alpine AS production
# Copia los archivos compilados del stage 'build' al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copia la configuración personalizada de Nginx (SPA routing, cache, gzip)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Nginx en primer plano (requerido por Docker para mantener el contenedor activo)
CMD ["nginx", "-g", "daemon off;"]
