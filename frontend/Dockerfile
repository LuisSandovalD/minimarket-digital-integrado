# ============================================================
# DOCKERFILE - FRONTEND
# Utiliza una estrategia de construcción en dos etapas
# (multi-stage build) para optimizar el tamaño final
# de la imagen: primero compila la app, luego solo
# copia los archivos estáticos a Nginx.
# ============================================================

# ========================================
# BUILD STAGE
# Primera etapa: compila el proyecto React/Vite.
# Esta etapa usa Node.js para instalar dependencias
# y generar los archivos estáticos optimizados.
# La etiqueta "AS builder" permite referenciarla
# desde la segunda etapa.
# ========================================

FROM node:20-alpine AS builder
# node:20-alpine: imagen ligera de Node.js 20 para compilar

WORKDIR /app
# Establece /app como directorio de trabajo en esta etapa

COPY package*.json ./
# Copia los archivos de dependencias antes que el código
# para aprovechar la caché de capas de Docker

RUN npm install
# Instala todas las dependencias (incluyendo devDependencies
# necesarias para el proceso de build como Vite)

COPY . .
# Copia todo el código fuente del frontend al contenedor

RUN npm run build
# Ejecuta el proceso de compilación de Vite.
# Genera los archivos estáticos optimizados en la carpeta /app/dist
# (HTML, CSS, JS minificados y listos para producción)

# ========================================
# NGINX STAGE
# Segunda etapa: sirve los archivos estáticos con Nginx.
# Esta es la imagen final que se desplegará.
# Al usar una imagen nueva, se descartan Node.js y todas
# las dependencias de desarrollo, reduciendo el tamaño
# de la imagen final significativamente.
# ========================================

FROM nginx:stable-alpine
# nginx:stable-alpine: imagen oficial de Nginx, versión estable y ligera

COPY --from=builder /app/dist /usr/share/nginx/html
# Copia SOLO los archivos compilados desde la etapa "builder"
# al directorio que Nginx sirve por defecto.
# --from=builder indica que se toman de la etapa anterior, no del host.

EXPOSE 80
# Documenta que Nginx escucha en el puerto 80 (HTTP estándar)

CMD ["nginx", "-g", "daemon off;"]
# Inicia Nginx en primer plano (foreground).
# "daemon off" es necesario para que Docker pueda
# gestionar el proceso correctamente; sin esto,
# Nginx correría en background y el contenedor terminaría.