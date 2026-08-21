# Student Management API

A RESTful API built with Express.js, TypeScript, and PostgreSQL for student and user management, featuring JWT authentication and role-based access control.

---

## Project Dependencies

### Production Dependencies
* bcrypt (^6.0.0)
* cors (^2.8.6)
* dotenv (^17.4.2)
* express (^5.2.1)
* jsonwebtoken (^9.0.3)
* pg (^8.23.0)

### Development Dependencies
* @types/bcrypt (^6.0.0)
* @types/cors (^2.8.19)
* @types/express (^5.0.6)
* @types/jsonwebtoken (^9.0.10)
* @types/node (^26.2.0)
* @types/pg (^8.21.0)
* ts-node (^10.9.2)
* tsx (^4.23.12)
* typescript (^7.0.2)

---

## Setup & Installation

### 1. Installation
Clone the repository and install all required packages:
npm install

### 2. Environment Variables
Create a .env file in the root directory:
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/students_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1h
CORS_ORIGINS=*

### 3. Database Setup
Run the migration runner and seed data scripts:
npm run migrate
npm run seed

### 4. Run the Application
Start the development server with live reload:
npm run dev

---

## How Authentication & Authorization Works

1. Authentication Flow:
   - Register a new account via POST /auth/register (default role is STUDENT).
   - Log in via POST /auth/login to obtain a JWT access token.
   - Attach the token to protected requests in the HTTP header:
     Authorization: Bearer <your_access_token>

2. Role-Based Permissions:
   - STUDENT: Access to read endpoints (GET /students, GET /students/:id).
   - ADMIN: Full access to mutate student records (POST, PUT, PATCH, DELETE).

---

## API Endpoints Reference

### Auth Endpoints
Method | Endpoint       | Access | Body Example
POST   | /auth/register | Public | {"email": "user@email.com", "password": "password123", "role": "STUDENT"}
POST   | /auth/login    | Public | {"email": "user@email.com", "password": "password123"}

### Student Endpoints
Method | Endpoint      | Authorization | Description
GET    | /students     | Authenticated | Retrieve all student records
GET    | /students/:id | Authenticated | Retrieve a single student by UUID/ID
POST   | /students     | Admin Only    | Create a new student record
PUT    | /students/:id | Admin Only    | Replace/Update an entire student record
PATCH  | /students/:id | Admin Only    | Partially update student fields
DELETE | /students/:id | Admin Only    | Remove a student record