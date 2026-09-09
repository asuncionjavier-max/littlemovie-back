# littlemovie-back

API RESTful para un e-commerce de películas, construida con Node.js, Express, Prisma y Supabase (PostgreSQL).

Proyecto personal para poner en práctica arquitectura en capas, autenticación con JWT, diseño de base de datos relacional y documentación de API con Swagger/OpenAPI.

## Stack

- Node.js + Express 5
- Prisma ORM + Supabase (PostgreSQL)
- Mongoose (MongoDB) para funcionalidades complementarias
- JWT (cookies httpOnly) para autenticación
- bcrypt para hash de contraseñas
- Swagger / OpenAPI 3.0 para la documentación
- Jest para testing

## Arquitectura

El proyecto sigue una arquitectura en capas:

```
routes → controllers → services
```

- **routes**: definición de endpoints
- **controllers**: manejo de request/response
- **services**: lógica de negocio y acceso a datos
- **middlewares**: autenticación, manejo de errores, etc.

## Funcionalidades

- **Auth**: registro, login y logout con JWT en cookies httpOnly
- **Perfil**: consultar, actualizar y eliminar cuenta de usuario
- **Películas**: listado, detalle, actualización y borrado (CRUD)
- **Wishlist**: añadir, ver y eliminar películas de la lista de deseos
- **Carrito**: añadir, ver y eliminar películas del carrito
- **Checkout**: procesar la compra

## Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/health | Verifica que el servidor funciona |
| POST | /api/register | Registro de usuario |
| POST | /api/login | Inicio de sesión |
| POST | /api/logout | Cierre de sesión |
| GET | /api/profile | Obtener perfil del usuario |
| PATCH | /api/profile | Actualizar perfil del usuario |
| DELETE | /api/profile | Eliminar cuenta de usuario |
| GET | /api/allprofiles | Listar todos los usuarios |
| GET | /api/movies | Listado de películas |
| GET | /api/movies/:id | Obtener película por ID |
| PATCH | /api/movies/:id | Actualizar película |
| DELETE | /api/movies/:id | Eliminar película |
| GET | /api/wishlist | Obtener wishlist del usuario |
| POST | /api/wishlist | Añadir película a la wishlist |
| DELETE | /api/wishlist/:movieId | Eliminar película de la wishlist |
| GET | /api/cart | Obtener carrito del usuario |
| POST | /api/cart | Añadir película al carrito |
| DELETE | /api/cart | Eliminar película del carrito |
| POST | /api/checkout | Procesar la compra |

La documentación completa e interactiva está disponible en `/api/docs` (Swagger UI) una vez levantado el servidor.

## Instalación

```bash
git clone <url-del-repo>
cd littlemovie-back
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz con:

```
DATABASE_URL=
DIRECT_URL=
PORT=
NODE_ENV=
JWT_SECRET=
MONGO_URI=
```

## Scripts

```bash
npm run dev     # arranca el servidor en modo desarrollo (con --watch)
npm start       # arranca el servidor
npm test        # ejecuta los tests con Jest
```

## Prisma

```bash
npx prisma generate     # genera el cliente de Prisma
npx prisma db pull      # sincroniza el schema con la base de datos
```

## Estado del proyecto

En desarrollo. Pendiente de despliegue y de seguir puliendo validaciones y tests.

## Autor

Javier Asuncion 
