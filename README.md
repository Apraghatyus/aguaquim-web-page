# AGUAQUIM - Laboratorio de Análisis de Agua

Página web del laboratorio **AGUAQUIM**, especializado en análisis fisicoquímico y microbiológico de agua. Construida con **Vue.js 3** + **Vite** + **Vue Router 4** y desplegable con **Docker**.

---

## Estructura del Proyecto

```
aguaquim-web-page/
├── Dockerfile                  # Multi-stage: dev → build → producción (Nginx)
├── docker-compose.yml          # Entorno de desarrollo con Docker
├── docker-compose.prod.yml     # Entorno de producción con Docker
├── nginx.conf                  # Configuración de Nginx (SPA routing, cache, gzip)
├── .dockerignore               # Archivos excluidos de la imagen Docker
├── .gitignore                  # Archivos excluidos de Git
├── package.json                # Dependencias y scripts npm
├── vite.config.js              # Configuración del bundler Vite + Vitest
├── index.html                  # HTML raíz con meta tags SEO
├── .env.development            # Variables de entorno para desarrollo
├── .env.production             # Variables de entorno para producción
│
├── tests/                      # Tests unitarios (Vitest + jsdom)
│   ├── models.test.js          # 14 tests: factories y valores por defecto
│   ├── mocks.test.js           # 12 tests: estructura y contenido de mocks
│   └── validators.test.js      # 24 tests: validación de formularios
│
├── public/
│   └── favicon.svg             # Favicon del laboratorio
│
└── src/
    ├── main.js                 # Punto de entrada: Pinia + Router + CSS global
    ├── App.vue                 # Layout raíz: NavBar + RouterView + Footer + dark mode
    │
    ├── router/
    │   └── index.js            # Rutas con lazy-loading, scroll-to-hash y route guards
    │
    ├── views/
    │   └── HomePage.vue        # Landing page: ensambla las 5 secciones
    │
    ├── stores/                 # Stores Pinia (estado global)
    │   ├── index.js            # Barrel export de todos los stores
    │   └── auth.js             # Autenticación: login, logout, JWT, checkSession
    │
    ├── models/                 # Modelos de datos (factories + JSDoc typedefs)
    │   ├── index.js            # Barrel export de todos los modelos
    │   ├── Service.js          # Service: id, icon, title, description, items[]
    │   ├── City.js             # City: id, name, dept
    │   ├── CompanyValue.js     # CompanyValue: id, title, desc
    │   └── Contact.js          # Contact, ContactFormData, SignupData, ApiResponse
    │
    ├── mocks/                  # Datos mock para desarrollo sin backend
    │   ├── index.js            # Barrel export de todos los mocks
    │   ├── services.mock.js    # 3 servicios: Piscina, Agua Potable, IRCA
    │   ├── coverage.mock.js    # 7 ciudades: Cali, Jamundí, Yumbo, Palmira...
    │   ├── about.mock.js       # 3 valores: Precisión, Calidad, Servicio
    │   └── contact.mock.js     # Contacto + respuestas simuladas de API
    │
    ├── services/               # Capa de servicios HTTP (fetch + fallback a mocks)
    │   ├── index.js            # Barrel export de todas las funciones de servicio
    │   ├── client.js           # Cliente HTTP: JWT auto, 401 handler, GET/POST/PUT/DELETE
    │   ├── services.js         # getServices(), getServiceById()
    │   ├── coverage.js         # getCities()
    │   ├── about.js            # getCompanyValues()
    │   └── contact.js          # getContactInfo(), submitContactForm(), submitSignup()
    │
    ├── hooks/                  # Hooks Vue 3 (estado reactivo sobre los services)
    │   ├── useApi.js           # Genérico: data, loading, error, execute
    │   ├── useServices.js      # services: Service[]
    │   ├── useCoverage.js      # cities: City[], totalCities
    │   ├── useAbout.js         # values: CompanyValue[]
    │   └── useContact.js       # contact: Contact, submitForm(), submitSignupForm()
    │
    ├── utils/                  # Utilidades compartidas
    │   ├── index.js            # Barrel export de utilidades
    │   └── validators.js       # Validación: contacto, inscripción, login
    │
    ├── assets/
    │   └── styles/             # 13 parciales CSS centralizados
    │       ├── main.css        # Orquestador: importa los 13 parciales en orden
    │       ├── _variables.css  # Design tokens: colores, tipografía, sombras, temas
    │       ├── _base.css       # Reset y estilos base del navegador
    │       ├── _layout.css     # .container, .section, .section-header
    │       ├── _typography.css # .section-label, .section-title, .text-gradient
    │       ├── _buttons.css    # .btn + 7 variantes (--primary, --wa, --cta...)
    │       ├── _cards.css      # .card-base + 3 niveles de elevación
    │       ├── _navbar.css     # Glassmorphism, hamburguesa, dark toggle
    │       ├── _hero.css       # Hero layout, tarjetas flotantes, formas blur
    │       ├── _about.css      # Grid 2 columnas, value-card
    │       ├── _services.css   # Grid 3 columnas, featured card, iconos
    │       ├── _coverage.css   # Layout asimétrico, city-card, estadística
    │       ├── _signup.css     # CTA card, blob glassmorphism
    │       └── _footer.css     # Grid 4 columnas, brand, contact-list
    │
    └── components/             # Componentes Vue (solo <template> + <script setup>)
        ├── NavBar.vue          # Navbar fija con glassmorphism + dark toggle
        ├── HeroSection.vue     # Hero con título, CTA y tarjetas decorativas
        ├── AboutSection.vue    # Quiénes Somos + valores del laboratorio
        ├── ServicesSection.vue # Servicios: Piscina, Agua Potable, IRCA
        ├── CoverageSection.vue # Cobertura: 7 ciudades del Valle y Cauca
        ├── SignupSection.vue   # Inscríbete: WhatsApp y correo electrónico
        └── FooterSection.vue   # Footer con contacto, links y copyright
```

---

## Requisitos

- **Node.js** 18+ y **npm** (para desarrollo sin Docker)
- **Docker** y **Docker Compose** (para desarrollo/producción con contenedores)

---

## Desarrollo

Hay dos formas de trabajar en desarrollo:

### Opción A: Sin Docker (más rápido para editar)

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo con hot-reload
npm run dev
```

Abre **http://localhost:5173** en el navegador. Cualquier cambio en el código se refleja instantáneamente gracias a Vite HMR (Hot Module Replacement).

### Opción B: Con Docker

```bash
# Construir la imagen y levantar el contenedor
docker compose up --build
```

Abre **http://localhost:5173**. El código se sincroniza con el contenedor mediante volúmenes, así que los cambios también se reflejan en tiempo real.

**¿Qué hace internamente?**
1. Usa el stage `dev` del `Dockerfile` (Node.js 20 Alpine)
2. Ejecuta `npm run dev` dentro del contenedor
3. Monta el directorio local como volumen (`volumes: .:/app`)
4. Un volumen anónimo (`/app/node_modules`) evita conflictos con las dependencias del host

Para detener: `Ctrl+C` o `docker compose down`

---

## Producción

### Construir y desplegar con Docker

```bash
# Compilar y levantar en producción
docker compose -f docker-compose.prod.yml up --build
```

Abre **http://localhost** (puerto 80). La página estará servida por Nginx.

**¿Qué hace internamente?**

El `Dockerfile` tiene un pipeline multi-stage de 3 etapas:

| Etapa | Imagen Base | Qué hace |
|---|---|---|
| **1. dev** | `node:20-alpine` | Levanta Vite para desarrollo (NO se usa en producción) |
| **2. build** | `node:20-alpine` | Ejecuta `npm run build` → genera archivos estáticos optimizados en `/dist` |
| **3. production** | `nginx:alpine` | Copia los archivos de `/dist` y los sirve con Nginx |

La imagen final de producción:
- Pesa ~25MB (solo contiene Nginx + archivos estáticos)
- **No incluye** Node.js, npm, ni código fuente
- **No incluye** `node_modules`
- Se reinicia automáticamente si se cae (`restart: unless-stopped`)

### Construir solo los archivos estáticos (sin Docker)

```bash
npm run build
```

Genera la carpeta `dist/` con archivos HTML, CSS y JS optimizados y minificados. Puedes subir esta carpeta a cualquier hosting estático (Nginx, Apache, Netlify, Vercel, etc.).

Para previsualizar el build localmente:

```bash
npm run preview
```

---

## Configuración de Nginx (Producción)

El archivo `nginx.conf` configura:

- **SPA Routing**: Redirige todas las rutas a `index.html` para que Vue maneje la navegación del lado del cliente. Esto evita errores 404 al recargar la página.
- **Cache de assets**: Los archivos JS, CSS, imágenes y fuentes se cachean por 1 año. Es seguro porque Vite genera nombres con hash (ej: `index-Qa-VUkVs.js`): si el contenido cambia, el hash cambia.
- **Compresión gzip**: Reduce el tamaño de transferencia de archivos de texto entre un 60-80%.

---

## Dark Mode

La página incluye un botón de cambio de tema (luna/sol) en la barra de navegación:

1. Al hacer clic, se alterna el atributo `data-theme` en el `<html>` entre `light` y `dark`
2. Esto activa las variables CSS del tema oscuro definidas en `main.css`
3. La preferencia se guarda en `localStorage` para persistir entre visitas
4. Si es la primera visita, se respeta la preferencia del sistema operativo (`prefers-color-scheme: dark`)

---

## Colores Corporativos

| Variable | Valor | Uso |
|---|---|---|
| `--color-primary` | `#0066CC` (Azul intenso) | Botones, títulos, navbar activo |
| `--color-secondary` | `#6BCCD4` (Turquesa claro) | Acentos, labels, hover states |

---

## Arquitectura de Datos

El proyecto sigue un flujo de datos unidireccional con separación clara de responsabilidades:

```
Modelos (src/models/)          → Definen la estructura de los datos (factories + JSDoc)
    ↓
Mocks (src/mocks/)             → Datos estáticos para desarrollo sin backend
    ↓
Services (src/services/)       → Llamadas HTTP con fallback automático a mocks
    ↓
Hooks (src/hooks/)             → Estado reactivo Vue 3 (data, loading, error)
    ↓
Componentes (src/components/)  → Renderizan los datos en el template
```

### Modelos

Cada modelo es una **factory function** que normaliza datos crudos del JSON:

```js
import { createService } from '@/models'
const service = createService({ id: 1, title: 'Análisis', items: ['pH'] })
// → { id: 1, icon: '', title: 'Análisis', description: '', items: ['pH'] }
```

Esto garantiza que todos los campos existan con valores por defecto, evitando errores `undefined`.

### Mocks

Los datos mock se crean usando las factories de los modelos:

```js
import { createServiceList } from '../models/Service.js'
export const MOCK_SERVICES = createServiceList([{ id: 1, title: '...', ... }])
```

### Services con fallback

Cada módulo de servicio intenta cargar desde el backend y, si falla, retorna los mocks:

```js
export async function getServices() {
  try {
    const raw = await apiClient.get('/servicios')
    return createServiceList(raw)       // Normaliza datos del backend
  } catch {
    return MOCK_SERVICES                 // Fallback a datos estáticos
  }
}
```

### Hooks

Los hooks encapsulan la lógica reactiva para usar en los componentes:

```js
const { services, loading, error, refresh } = useServices()
// services.value → Service[] (reactivo, se actualiza solo)
```

---

## Arquitectura de Estilos

Los componentes `.vue` **no contienen `<style>`**. Todos los estilos están centralizados en 13 parciales CSS:

| Parcial | Contenido |
|---|---|
| `_variables.css` | Design tokens: colores, tipografía (10 tamaños), radios (6), transiciones, tema claro/oscuro |
| `_base.css` | Reset del navegador y estilos globales de elementos |
| `_layout.css` | `.container`, `.section`, `.section-header` |
| `_typography.css` | `.section-label`, `.section-title`, `.text-gradient` |
| `_buttons.css` | `.btn` + 7 variantes: `--primary`, `--secondary`, `--cta`, `--link`, `--card-link`, `--wa`, `--email` |
| `_cards.css` | `.card-base` + 3 niveles de elevación: `--lift-sm`, `--lift-md`, `--lift-lg` |
| `_navbar.css` – `_footer.css` | Estilos específicos de cada componente/sección |

Los estilos de componentes que usan nombres genéricos (`.card-icon`, `.card-header`) se acotan con selectores padre (`.hero .card-icon`, `.service-card .card-header`) para evitar colisiones.

---

## Vue Router

Configurado con lazy-loading en `src/router/index.js`:

```js
{ path: '/', component: () => import('../views/HomePage.vue') }
```

- **Hash navigation**: scroll suave a `#servicios`, `#contacto`, etc.
- **Posición guardada**: el botón atrás restaura la posición de scroll
- **Route guards**: rutas con `meta: { requiresAuth: true }` redirigen a Home si no hay sesión
- **Guest only**: rutas con `meta: { guestOnly: true }` redirigen si ya está autenticado

---

## Autenticación (Pinia + JWT)

El store `src/stores/auth.js` gestiona el estado global de autenticación:

```js
import { useAuthStore } from '@/stores'

const auth = useAuthStore()
await auth.login({ email, password })   // Guarda token en localStorage
auth.isAuthenticated                     // true
auth.user                               // { name, email, role }
auth.logout()                           // Limpia token y datos
```

El **cliente HTTP** (`services/client.js`) inyecta automáticamente el token JWT en cada request:
- `Authorization: Bearer <token>` en todos los headers
- Si el servidor responde **401**, limpia la sesión y redirige al inicio

---

## Variables de Entorno

Archivos `.env` por entorno (Vite los expone en `import.meta.env`):

| Archivo | `VITE_API_URL` | Uso |
|---|---|---|
| `.env.development` | `/api` (proxy local) | `npm run dev` |
| `.env.production` | `https://api.aguaquim.com` | `npm run build` |

---

## Validación de Formularios

`src/utils/validators.js` provee validadores para los 3 tipos de formulario:

```js
import { validateContactForm, isValid } from '@/utils'

const errors = validateContactForm({ name: '', email: 'bad', service: '', message: '' })
// errors = { name: '...', email: '...', service: '...', message: '...' }

if (isValid(errors)) {
  await submitForm(data)
}
```

| Validador | Campos | Reglas |
|---|---|---|
| `validateContactForm()` | name, email, phone?, service, message | Email regex, phone 7-15 dígitos |
| `validateSignup()` | name, nit, email, phone, city, serviceType | NIT regex, todos obligatorios |
| `validateLogin()` | email, password | Email regex, password ≥ 8 chars |

---

## Testing

Configurado con **Vitest** y **jsdom** para simular el DOM:

```bash
# Ejecutar todos los tests una vez
npm test

# Ejecutar en modo watch (re-ejecuta al guardar)
npm run test:watch
```

| Suite | Tests | Qué valida |
|---|---|---|
| `models.test.js` | 14 | Factories: normalización, defaults, edge cases |
| `mocks.test.js` | 12 | Estructura y contenido de datos mock |
| `validators.test.js` | 24 | Validación: campos vacíos, formatos, casos válidos |

Total: **50 tests**.

---

## Escalabilidad (próximos pasos)

La arquitectura actual está preparada para escalar:

- **Backend real**: Solo configurar `VITE_API_URL` en `.env.production` — services/ y auth ya hacen las llamadas HTTP con JWT
- **Nuevas páginas protegidas**: Agregar rutas con `meta: { requiresAuth: true }` — el guard ya está activo
- **Formularios**: Los validadores y las funciones `submitContactForm` / `submitSignup` están listos para conectar
- **Nuevos stores**: Agregar stores Pinia para carrito, notificaciones, etc. en `src/stores/`
- **CMS / Blog**: Agregar modelos, mocks y services para contenido editorial
- **Más tests**: Agregar tests de hooks con Vue Test Utils (`@vue/test-utils` ya instalado)
