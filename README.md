# NEO ParkFlow

> Sistema de Gestión de Parqueadero Universitario — Universidad de La Sabana

![Pipeline](https://github.com/santyBarru/parkflow-neo/actions/workflows/ci.yml/badge.svg)

---

## ¿Qué es NEO ParkFlow?

NEO ParkFlow es un sistema completo de gestión de parqueadero universitario desarrollado para la materia **Diseño y Arquitectura de Software**. El sistema permite gestionar la entrada y salida de vehículos, calcular tarifas automáticamente y monitorear el estado del parqueadero en tiempo real.

---

## Stack Tecnológico

| Capa          | Tecnología              |
| ------------- | ----------------------- |
| Backend       | Spring Boot 3.5 + Java  |
| Frontend      | TypeScript + Vite       |
| Base de datos | PostgreSQL 17           |
| Contenedores  | Docker + Docker Compose |
| CI/CD         | GitHub Actions          |
| Monitoreo     | Prometheus + Grafana    |
| Seguridad     | JWT + Spring Security   |

---

## Cómo ejecutar el proyecto

### Requisitos

- Java 17+
- Node.js 18+
- PostgreSQL 17
- Docker (opcional)

### Backend

```bash
cd Back-end/backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd parkflow-frontend
npm install
npm run dev
```

### Con Docker

```bash
docker-compose up --build
```

---

## Pruebas Automatizadas

| Tipo      | Herramienta       | Cantidad      | Estado |
| --------- | ----------------- | ------------- | ------ |
| Unitarias | JUnit 5 + Mockito | 15 pruebas    | ok     |
| API       | Postman + Newman  | 16 assertions | ok     |
| GUI       | Cypress           | 3 pruebas     | ok     |
| Carga     | k6                | 2572 checks   | ok     |
| Cobertura | JaCoCo            | Security 75%  | ok     |

### Correr pruebas unitarias

```bash
cd Back-end/backend
./mvnw test
```

### Correr pruebas de API

```bash
newman run postman_collection.json
```

### Correr pruebas de carga

```bash
k6 run k6-load-test.js
```

### Correr pruebas de GUI

```bash
cd parkflow-frontend
npx cypress run --spec "cypress/e2e/parkflow.cy.js"
```

---

## Pipeline CI/CD

El pipeline corre automáticamente en cada push a `main`:

1. Compilación y pruebas unitarias
2. Arranque del backend
3. Pruebas de API con Newman
4. Pruebas de GUI con Cypress
5. Escaneo de secretos con Gitleaks
6. Escaneo de vulnerabilidades con Trivy
7. SAST con Semgrep
8. OWASP Dependency Check

[Ver pipeline en vivo](https://github.com/santyBarru/parkflow-neo/actions)

---

## DevSecOps

| Herramienta  | Tipo               | Resultado |
| ------------ | ------------------ | --------- |
| Gitleaks     | Secrets Scanning   | Activo    |
| Trivy        | Container Scanning | Activo    |
| Semgrep      | SAST               | Activo    |
| OWASP        | Dependency Check   | Activo    |
| JWT + BCrypt | Autenticación      | Activo    |

---

## Arquitectura

El sistema sigue una **arquitectura monolítica** con separación clara de capas:

parkflow-neo/
├── Back-end/backend/ ← Spring Boot API REST
├── parkflow-frontend/ ← TypeScript + Vite
├── docs/ ← Documentación técnica
├── .github/workflows/ ← Pipeline CI/CD
├── docker-compose.yml ← Contenedorización
├── postman_collection.json ← Pruebas de API
└── k6-load-test.js ← Pruebas de carga

[Ver documentación C4 y 4+1 en el Wiki](https://github.com/santyBarru/parkflow-neo/wiki)

---

## Credenciales de prueba

| Usuario  | Contraseña  | Rol           |
| -------- | ----------- | ------------- |
| admin    | admin123    | Administrador |
| cela     | celador1234 | Celador       |
| santiago | luna1234    | Usuario       |

---

## Autor

**Santiago Barrera** — Universidad de La Sabana  
Materia: Diseño y Arquitectura de Software  
Profesor: César Augusto Vega Fernández  
2026
