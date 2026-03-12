# Proyecto: Tareas Escolares

Este es un proyecto académico desarrollado para la gestión de tareas escolares, utilizando una arquitectura de backend robusta para la creación de **APIs RESTful**.

## Descripción
El objetivo de este proyecto es implementar una API que permita realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) sobre una base de datos PostgreSQL, facilitando el control y seguimiento de las actividades académicas.

## Backend
Para replicar este proyecto en un entorno de desarrollo diferente, es necesario contar con las siguientes herramientas y librerías instaladas:

| Herramienta / Librería | Versión | Descripción |
| :--- | :--- | :--- |
| Node.js | v24.13.0 | Entorno de ejecución de JavaScript |
| Express | express@5.2.1 | Framework para la creación de rutas y API |
| PostgreSQL | v17.7 | Sistema de gestión de base de datos relacional |
| Dotenv | dotenv@17.3.1 | Gestión de variables de entorno |
| Git Bash | 2.53.0 | Terminal para control de versiones |
| Postman | v12.1.3 | Herramienta para pruebas y validación de endpoints |



### Endpoints de la API
Esta tabla detalla todas las rutas disponibles en tu servidor local (`http://localhost:3000`):

| Endpoint | Método | Descripción |
| :--- | :--- | :--- |
| `http://localhost:3000/api/auth/register` | `POST` | Registra un nuevo usuario. |
| `http://localhost:3000/api/auth/login` | `POST` | Inicia sesión y entrega token. |
| `http://localhost:3000/api/tareas` | `GET` | Lista todas las tareas. |
| `http://localhost:3000/api/tareas` | `POST` | Crea una nueva tarea. |
| `http://localhost:3000/api/tareas/:id` | `PUT` | Actualiza una tarea existente. |
| `http://localhost:3000/api/tareas/:id` | `DELETE` | Elimina una tarea. |
| `http://localhost:3000/api/materias` | `GET` | Consulta catálogo de materias. |
| `http://localhost:3000/api/materias` | `POST` | Registra una nueva materia. |
| `http://localhost:3000/api/periodos` | `GET` | Consulta periodos escolares. |
| `http://localhost:3000/api/periodos` | `POST` | Registra un nuevo periodo. |
| `http://localhost:3000/api/horarios` | `POST` | Asigna un horario a una materia. |
| `http://localhost:3000/api/horarios/:id` | `DELETE` | Elimina un horario registrado. |



---

### Información Académica
* **Universidad:** Universidad Politécnica de Bacalar
* **Desarrolladora:** Mayra Liliana
* **Fecha:** 12 de marzo de 2026