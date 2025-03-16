# Tienda Natuvida Frontend

Este proyecto es el frontend de la tienda online de Natuvida, desarrollado con Next.js y diseñado para integrarse con un backend Spring Boot.

## Características

- Catálogo de productos con categorías y filtros
- Fichas detalladas de productos
- Carrito de compras
- Proceso de pago
- Autenticación de usuarios
- Perfil de usuario y historial de pedidos
- Diseño responsive para móviles y escritorio

## Tecnologías utilizadas

- **Next.js**: Framework de React para renderizado del lado del servidor
- **TypeScript**: Para un código más robusto y mantenible
- **Tailwind CSS**: Para estilos y diseño responsive

## Requisitos

- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/your-username/tienda-natuvida-frontend.git
cd tienda-natuvida-frontend
```

1. Instalar dependencias:

```bash
npm install
# o con yarn
yarn install
```

1. Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

1. Iniciar el servidor de desarrollo:

```bash
npm run dev
# o con yarn
yarn dev
```

1. Abrir [http://localhost:3000](http://localhost:3000/) en el navegador para ver la aplicación.

## Estructura del proyecto

```
src/
├── app/                  # Páginas y rutas de la aplicación
├── components/           # Componentes reutilizables
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades y funciones auxiliares
├── types/                # Definiciones de tipos TypeScript
└── styles/               # Estilos globales y variables
```

## Integración con el backend

El frontend se comunica con el backend Spring Boot a través de una API REST. Las rutas de la API están configuradas en `src/lib/api.ts`.

## Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Inicia la aplicación en modo producción
- `npm run lint`: Ejecuta el linter para verificar el código
- `npm run test`: Ejecuta las pruebas

## Despliegue

Para desplegar en producción:

1. Construir la aplicación:

```bash
npm run build
```

1. Iniciar el servidor:

```bash
npm run start
```
