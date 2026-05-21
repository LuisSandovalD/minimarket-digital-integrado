# ============================================================
# DOCKERFILE - BACKEND
# Construye la imagen Docker para el servidor Node.js.
# Utiliza Node 20 sobre Alpine Linux (imagen ligera).
# ============================================================

# ========================================
# IMAGE
# Define la imagen base del contenedor.
# node:20-alpine es una versión ligera de Node.js 20
# basada en Alpine Linux (~50MB vs ~900MB de la versión completa).
# ========================================

FROM node:20-alpine

# ========================================
# WORKDIR
# Establece el directorio de trabajo dentro del contenedor.
# Todos los comandos siguientes se ejecutarán desde /app.
# Si la carpeta no existe, Docker la crea automáticamente.
# ========================================

WORKDIR /app

# ========================================
# COPY PACKAGE FILES
# Copia los archivos de configuración de dependencias.
# Se copian ANTES que el resto del código para aprovechar
# la caché de Docker: si package.json no cambia, Docker
# reutiliza la capa de instalación sin reinstalar todo.
# ========================================

COPY package*.json ./
# Copia tanto package.json como package-lock.json (si existe)

# ========================================
# COPY PRISMA
# Copia la carpeta prisma que contiene el schema de la
# base de datos. Debe copiarse antes de "npm install"
# porque la generación del cliente Prisma depende del schema.
# ========================================

COPY prisma ./prisma

# ========================================
# INSTALL DEPENDENCIES
# Instala todas las dependencias del proyecto
# definidas en package.json dentro del contenedor.
# ========================================

RUN npm install

# ========================================
# COPY ALL PROJECT
# Copia el resto del código fuente al contenedor.
# Se hace después de instalar dependencias para
# optimizar el uso de la caché de Docker.
# ========================================

COPY . .

# ========================================
# GENERATE PRISMA CLIENT
# Genera el cliente de Prisma a partir del schema.
# Esto crea el código TypeScript/JavaScript necesario
# para interactuar con la base de datos desde el código.
# ========================================

RUN npx prisma generate

# ========================================
# EXPOSE PORT
# Documenta que el contenedor escucha en el puerto 5000.
# No publica el puerto al exterior por sí solo;
# eso se configura en docker-compose con "ports".
# ========================================

EXPOSE 5000

# ========================================
# START SERVER
# Comando que se ejecuta cuando el contenedor inicia.
# "npm run dev" arranca el servidor en modo desarrollo
# (normalmente con nodemon para hot-reload).
# ========================================

CMD ["npm", "run", "dev"]