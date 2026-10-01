# CeraMax — Frontend

Aplicación web para la tienda y el panel administrativo de CeraMax, un sistema de comercialización y gestión de cerámicas. El frontend está construido con React, TypeScript y Vite, y consume la API REST del backend.

## Contenido

- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Conexión con el backend](#conexión-con-el-backend)
- [Módulos](#módulos)
- [Comprobaciones](#comprobaciones)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Trabajo por áreas](#trabajo-por-áreas)

## Requisitos

- Node.js compatible con la versión de Vite del proyecto.
- pnpm, utilizado junto con el lockfile `pnpm-lock.yaml`.
- Backend de CeraMax disponible en `http://localhost:8090` para iniciar sesión y utilizar las funciones conectadas a la API.

## Instalación y ejecución

Abre una terminal en la raíz del frontend y ejecuta:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Vite inicia normalmente en <http://localhost:5173>. Si ese puerto está ocupado, mostrará la dirección alternativa que esté utilizando.

Para instalar pnpm si todavía no está disponible:

```sh
corepack enable
corepack prepare pnpm@latest --activate
```

## Conexión con el backend

El cliente HTTP está en `src/core/api/client.ts` y apunta directamente a:

```text
http://localhost:8090/api
```

La URL está escrita en el código; el frontend no la lee desde `.env` ni desde una variable de Vite. Si el backend usa otra dirección —por ejemplo, en un despliegue—, actualiza la constante `baseURL` en ese archivo y vuelve a compilar el frontend.

Las solicitudes se realizan directamente desde el navegador, sin proxy de Vite. Por eso, configura CORS en el backend para permitir el origen del frontend. En desarrollo local, el origen habitual es `http://localhost:5173`.

La autenticación se realiza contra el backend y el cliente agrega el token de sesión a las solicitudes. No guardes credenciales, tokens ni claves privadas en el código del frontend.

## Módulos

| Módulo | Funcionalidad |
| --- | --- |
| Tienda | Inicio, catálogo público, detalle de producto y navegación de cliente. |
| Cuenta de cliente | Ingreso, registro, lista de deseos, carrito y checkout. |
| Productos | Gestión y búsqueda de productos. |
| Catálogos | Categorías, marcas y cupones. |
| Usuarios | Usuarios y roles del panel administrativo. |
| Inventario | Existencias y movimientos de inventario. |
| Operaciones | Compras, proveedores, almacenes, sucursales, ventas, pagos, envíos y devoluciones. |
| Reportes y auditoría | Indicadores, reportes y consulta de actividad administrativa. |

## Comprobaciones

```sh
pnpm lint
pnpm build
pnpm preview
```

- `pnpm lint` revisa el código con Oxlint.
- `pnpm build` comprueba TypeScript y genera la compilación de producción en `dist/`.
- `pnpm preview` sirve localmente el contenido compilado para verificarlo.

## Estructura del proyecto

```text
src/
├── app/          Rutas y composición de la aplicación
├── core/         Cliente API, autenticación, hooks y utilidades base
├── features/     Funcionalidades organizadas por módulo
├── layouts/      Estructuras para tienda, acceso y panel
├── shared/       Componentes, formularios y providers reutilizables
└── types/        Tipos comunes del frontend
```

## Trabajo por áreas

La carpeta `avances/` contiene una base común y entregas parciales para coordinar el trabajo:

- `avances/compartido/`: configuración, rutas, API, layouts y componentes comunes.
- `avances/persona1/`: autenticación y usuarios/roles.
- `avances/persona2/`: tienda pública, productos, categorías, marcas y cupones.
- `avances/persona3/`: inventario, operaciones comerciales, reportes y auditoría.

Las carpetas de persona contienen solo sus módulos asignados; no son aplicaciones completas ni se compilan de forma independiente. Para integrar una entrega, combina únicamente sus features con la base compartida y conserva las rutas y módulos de las demás áreas.

## Servicios de terceros

Las imágenes de productos y categorías se gestionan mediante Cloudinary desde el backend. Las credenciales de Cloudinary pertenecen a la configuración del servidor y no deben agregarse al código ni al build del frontend.
