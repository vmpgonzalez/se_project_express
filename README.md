# WTWR (What to Wear?): Back End

This is the back-end server for the **WTWR (What to Wear?)** application — a weather-based clothing recommendation app. It provides RESTful API endpoints that support user registration, authentication with JWT, user data management, and clothing item operations such as adding, retrieving, liking, and deleting items. The server is built using **Node.js**, **Express**, and **MongoDB**, with validation, error handling, and modular routing practices.

## Features

### 🧍‍♂️ User Management

- User signup with email and password (passwords are securely hashed with bcrypt).
- User signin with JWT authentication (7-day expiration).
- Retrieve the current logged-in user.
- Update user profile (name and avatar).

### 🔐 Authorization

- All routes except `POST /signup`, `POST /signin`, and `GET /items` are protected with JWT authentication middleware.
- Invalid or missing tokens return proper 401 Unauthorized JSON responses.

### 👕 Clothing Items API

- Add new clothing items (protected).
- Retrieve all clothing items (public).
- Like and unlike clothing items (protected).
- Delete clothing items (only the item's owner may delete).

### ⚠️ Error Handling

- Centralized error-handling middleware.
- Returns JSON responses for all errors.
- Uses consistent HTTP status codes:
  - 400 Bad Request
  - 401 Unauthorized
  - 403 Forbidden
  - 404 Not Found
  - 409 Conflict
  - 500 Internal Server Error

### 🌐 MongoDB Integration

- Data is stored using MongoDB.
- Mongoose is used for schema validation and database operations.

### 🧪 Validation

- Email and URL validation using **validator.js**.
- Request validation using **Celebrate/Joi**.
- Schema validation through Mongoose.

### 📝 Logging

- Request logging with **Winston** and **express-winston**.
- Error logging to a separate log file.

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Celebrate
- Joi
- validator.js
- dotenv
- cors
- Winston
- express-winston
- ESLint
- Nodemon

---

# Getting Started

## Install dependencies

```bash
npm install
```

## Run the server

```bash
npm start
```

## Run in development mode

```bash
npm run dev
```

## Run ESLint

```bash
npm run lint
```

---

# Environment Variables

Create a `.env` file with:

```env
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/wtwr_db
JWT_SECRET=your-secret-key
```

---

# API Endpoints

## Authentication

| Method | Endpoint  | Description             |
| ------ | --------- | ----------------------- |
| POST   | `/signup` | Register a new user     |
| POST   | `/signin` | Login and receive a JWT |

## Users

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| GET    | `/users/me` | Get current user              |
| PATCH  | `/users/me` | Update current user's profile |

## Clothing Items

| Method | Endpoint               | Description                 |
| ------ | ---------------------- | --------------------------- |
| GET    | `/items`               | Get all clothing items      |
| POST   | `/items`               | Create a clothing item      |
| PUT    | `/items/:itemId/likes` | Like an item                |
| DELETE | `/items/:itemId/likes` | Remove a like               |
| DELETE | `/items/:itemId`       | Delete an item (owner only) |

---

# Live Application

## Frontend

**Current HTTP URL**

http://victorpachecog.strangled.net

**HTTPS URL (available once SSL certificate is issued)**

https://victorpachecog.strangled.net

## Backend API

**Current HTTP URL**

http://api.victorpachecog.strangled.net

**HTTPS URL (available once SSL certificate is issued)**

https://api.victorpachecog.strangled.net

> **Note:** HTTPS is currently pending SSL certificate issuance due to a Let's Encrypt rate limit on the shared `strangled.net` domain. Once the certificate is issued, the HTTPS links above will become active.

---

# Frontend Repository

https://github.com/vmpgonzalez/se_project_react

---

# Project Pitch Video

Project presentation video:

**Add your Google Drive or YouTube link here after recording your project walkthrough.**

---

# Author

Victor Pacheco Gonzalez
