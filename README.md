# Minimarket Digital Integrado

Plataforma SaaS de gestión comercial, inventario y punto de venta multiempresa.

Repositorio oficial:
[GitHub - Minimarket Digital Integrado](https://github.com/LuisSandovalD/minimarket-digital-integrado?utm_source=chatgpt.com)

---

# Tecnologías Utilizadas

## Frontend

* React
* Vite
* JavaScript (ESModules)
* CSS Moderno
* ESLint
* Prettier

---

## Backend

* Node.js
* Express
* Prisma ORM
* JWT Authentication

---

## Base de Datos

* PostgreSQL
* Neon

---

## DevOps

* Docker
* Git
* GitHub
* GitHub Actions
* Vercel
* Render

---

# Características del Sistema

* Multiempresa
* Multi sucursal
* Inventario
* Ventas
* Compras
* Dashboard administrativo
* Gestión de usuarios
* Roles y permisos
* Auditoría
* Soporte técnico
* Arquitectura modular
* Seguridad JWT

---

# PASOS PARA EJECUTAR EL PROYECTO (IMPORTANTE)

# 1. INSTALAR PROGRAMAS NECESARIOS

Todos deben instalar:

## Descargar Node.js

Descargar e instalar:

[Node.js Oficial](https://nodejs.org/?utm_source=chatgpt.com)

Verificar instalación:

```bash
node -v
npm -v
```

---

## Descargar Git

[Git Oficial](https://git-scm.com/?utm_source=chatgpt.com)

Verificar:

```bash
git --version
```

---

## Descargar Visual Studio Code

[Visual Studio Code](https://code.visualstudio.com/?utm_source=chatgpt.com)

---

## Descargar Docker Desktop

[Docker Desktop](https://www.docker.com/products/docker-desktop/?utm_source=chatgpt.com)

Verificar:

```bash
docker --version
```

---

# 2. CLONAR EL REPOSITORIO

Abrir terminal o CMD:

```bash
git clone https://github.com/LuisSandovalD/minimarket-digital-integrado.git
```

---

# 3. ENTRAR A LA CARPETA DEL PROYECTO

```bash
cd minimarket-digital-integrado
```

---

# 4. ABRIR EL PROYECTO EN VS CODE

```bash
code .
```

---

# 5. INSTALAR EXTENSIONES DE VS CODE

Instalar:

* ESLint
* Prettier
* Docker
* Prisma
* GitLens

---

# 6. CONFIGURAR FRONTEND

## Entrar al frontend

```bash
cd frontend
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar frontend

```bash
npm run dev
```

---

## Abrir en navegador

```txt
http://localhost:5173
```

---

# 7. CONFIGURAR BACKEND

Abrir otra terminal.

---

## Entrar al backend

```bash
cd backend
```

---

## Instalar dependencias

```bash
npm install
```

---

# 8. CONFIGURAR VARIABLES DE ENTORNO

Dentro de backend crear:

```txt
.env
```

---

## Ejemplo de variables

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

---

# 9. CONFIGURAR PRISMA

## Generar cliente Prisma

```bash
npx prisma generate
```

---

## Ejecutar migraciones

```bash
npx prisma migrate dev
```

---

# 10. EJECUTAR BACKEND

```bash
npm run dev
```

---

## Backend funcionando en:

```txt
http://localhost:3000
```

---

# 11. EJECUTAR TODO EL SISTEMA

## Frontend

```bash
cd frontend
npm run dev
```

---

## Backend

```bash
cd backend
npm run dev
```

---

# 12. CONFIGURAR ESLINT Y PRETTIER

## Instalar dependencias

```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
```

---

## Ejecutar ESLint

```bash
npm run lint
```

---

## Corregir automáticamente

```bash
npm run lint:fix
```

---

## Formatear código

```bash
npm run format
```

---

# 13. CONFIGURAR DOCKER

## Levantar contenedores

```bash
docker compose up --build
```

---

## Detener contenedores

```bash
docker compose down
```

---

# 14. ESTRUCTURA DEL FRONTEND

```txt
src/
├── api/
├── assets/
├── components/
├── features/
├── hooks/
├── layouts/
├── routes/
├── services/
├── theme/
├── utils/
└── main.jsx
```

---

# 15. ESTRUCTURA DE COMPONENTES

```txt
components/
├── data-display/
├── effects/
├── forms/
├── layout/
├── media/
├── overlays/
├── theme/
└── ui/
```

---

# 16. IMPORTANTE SOBRE COMPONENTES

Cada carpeta debe tener su propio:

```txt
index.js
```

Ejemplo:

```txt
table/
├── Table.jsx
├── THead.jsx
├── TFooter.jsx
└── index.js
```

---

## Ejemplo de barrel exports

```js
export * from "./Table";
export * from "./THead";
export * from "./TFooter";
```

---

# 17. FLUJO DE TRABAJO GIT

## Actualizar proyecto

```bash
git pull origin main
```

---

## Crear nueva rama

```bash
git checkout -b feature/nombre-feature
```

---

## Guardar cambios

```bash
git add .
git commit -m "feat: nueva funcionalidad"
```

---

## Subir cambios

```bash
git push origin feature/nombre-feature
```

---

# 18. CONVENCIONES DE COMMITS

```txt
feat: nueva funcionalidad
fix: corrección de errores
refactor: mejora de código
style: cambios visuales
docs: documentación
```

---

# 19. RECOMENDACIONES IMPORTANTES

* NO subir `.env`
* NO subir `node_modules`
* Ejecutar ESLint antes de subir cambios
* Mantener arquitectura modular
* Mantener componentes reutilizables
* Usar named exports
* Usar barrel exports (`index.js`)
* Mantener imports limpios

---

# 20. COMANDOS IMPORTANTES

## Frontend

```bash
npm run dev
npm run build
npm run lint
npm run lint:fix
npm run format
```

---

## Backend

```bash
npm run dev
npm run start
npx prisma generate
npx prisma migrate dev
```

---

# 21. DEPLOY DEL PROYECTO

## Frontend

Deploy en:

* Vercel

---

## Backend

Deploy en:

* Render

---

## Base de Datos

Base de datos en:

* Neon

---

# 22. OBJETIVO DEL PROYECTO

Sistema empresarial moderno orientado a:

* Escalabilidad
* SaaS Multiempresa
* Arquitectura profesional
* Componentes reutilizables
* Buenas prácticas
* DevOps moderno
* Seguridad
* Mantenimiento sencillo

Repositorio del proyecto:
[Minimarket Digital Integrado - GitHub](https://github.com/LuisSandovalD/minimarket-digital-integrado?utm_source=chatgpt.com)
