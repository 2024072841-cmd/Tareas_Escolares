# 𓍝 Proyecto: Studily - Gestión Escolar

Este es un proyecto académico integral desarrollado para la gestión inteligente de tareas, materias y periodos escolares. Utiliza una arquitectura moderna de **API RESTful** en el backend y una interfaz de usuario inspirada en el **iOS Design** en el frontend.

## Descripción
El objetivo de este proyecto es ofrecer una herramienta visualmente atractiva y funcional que permita realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre una base de datos PostgreSQL, facilitando el control académico con una experiencia de usuario de alta gama.

---

## Frontend (Interfaz de Usuario)
El frontend ha sido diseñado bajo los principios de **minimalismo y claridad de Apple**, enfocándose en la usabilidad "Edge-to-Edge", tipografías pesadas y feedback táctil.

| Herramienta / Librería | Versión | Descripción |
| :--- | :--- | :--- |
| **React.js** | v19.0.0 | Biblioteca base para la interfaz de usuario |
| **Tailwind CSS** | v4.0 | Framework de estilos para diseño iOS (Glassmorphism) |
| **React Router** | v7.1 | Gestión de navegación y rutas protegidas |
| **Axios** | v1.7 | Cliente HTTP para consumo de la API |
| **React Calendar** | v5.1 | Agenda interactiva para visualización de tareas |

### Características Principales
* **Dashboard Inteligente:** Saludo dinámico según la hora (`Buenos días`, `Buenas noches`) con nombre de usuario.
* **Filtros de Estatus:** Clasificación interactiva de tareas (Pendientes, Listas, Vencidas) con actualización en tiempo real.
* **Diseño Responsivo:** Sidebar flotante con efecto de cristal (`Backdrop-blur`) adaptado a móviles.
* **Arquitectura Limpia:** Manejo de estados y consumo de API centralizado.

---

## Backend (Servidor y API)
Para replicar el servidor en un entorno de desarrollo, se requieren las siguientes herramientas:

| Herramienta / Librería | Versión | Descripción |
| :--- | :--- | :--- |
| **Node.js** | v24.13.0 | Entorno de ejecución de JavaScript |
| **Express** | express@5.2.1 | Framework para la creación de rutas y API |
| **PostgreSQL** | v17.7 | Sistema de gestión de base de datos relacional |
| **Dotenv** | dotenv@17.3.1 | Gestión de variables de entorno |
| **Git Bash** | 2.53.0 | Terminal para control de versiones |
| **Postman** | v12.1.3 | Pruebas y validación de endpoints |

### Endpoints de la API
Servidor local base: `http://localhost:3000/api`

| Categoría | Método | Endpoint | Descripción |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/auth/register` | Registra un nuevo usuario en el sistema. |
| **Auth** | `POST` | `/auth/login` | Inicia sesión y entrega Token JWT. |
| **Tareas** | `GET/POST` | `/tareas` | Lista y crea actividades académicas. |
| **Tareas** | `PUT/DELETE`| `/tareas/:id` | Actualiza estatus (Check) o elimina tareas. |
| **Materias** | `GET/POST` | `/materias` | Gestiona el catálogo de materias por periodo. |
| **Periodos** | `GET/POST` | `/periodos` | Configura los ciclos escolares activos. |
| **Horarios** | `POST` | `/horarios` | Asigna horas de clase a las materias. |
| **Horarios** | `DELETE` | `/horarios/:id` | Elimina un registro de horario. |

---

### ᓚᘏᗢ Información Académica
* **Universidad:** Universidad Politécnica de Bacalar
* **Desarrolladora:** Mayra Liliana (˶ᵔ ᵕ ᵔ˶)
* **Fecha de entrega:** 12 de marzo de 2026