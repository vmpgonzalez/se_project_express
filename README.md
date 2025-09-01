# WTWR (What to Wear?): Back End

This is the back-end server for the **WTWR (What to Wear?)** application — a weather-based clothing recommendation app. It provides RESTful API endpoints that support user registration, authentication with JWT, user data management, and clothing item operations such as adding, retrieving, liking, and deleting items. The server is built using **Node.js**, **Express**, and **MongoDB**, with validation, error handling, and modular routing practices.

## Features

- 🧍‍♂️ **User Management**

  - User signup with email + password (passwords are hashed with bcrypt).
  - User signin with JWT authentication (7-day expiration).
  - Retrieve the current logged-in user.
  - Update user profile (name, avatar only).

- 🔐 **Authorization**

  - All routes except `POST /signup`, `POST /signin`, and `GET /items` are protected with JWT-based auth middleware.
  - Invalid or missing tokens return proper 401 JSON responses.

- 👕 **Clothing Items API**

  - Add new clothing items (protected).
  - Retrieve all clothing items (public).
  - Like/dislike clothing items (protected).
  - Delete clothing items (only by owner; others get 403).

- ⚠️ **Error Handling**

  - Centralized error-handling middleware that returns JSON (never HTML).
  - Uses consistent status codes: 400, 401, 403, 404, 409, 500.

- 🌐 **MongoDB Database Integration**

  - Data stored and managed in MongoDB with Mongoose ODM.
  - Schema validation for users and clothing items.

- 🧪 **Validation**
  - Email and URL validation with validator.js.
  - Schema validators ensure correct input formats.

## Technologies Used

- **Node.js** – Runtime for the server.
- **Express.js** – Routing, middleware, and server logic.
- **MongoDB & Mongoose** – Database and schema modeling.
- **JWT (jsonwebtoken)** – For secure user authentication.
- **bcryptjs** – For hashing user passwords.
- **Validator.js** – Input validation.
- **dotenv** – Manage environment variables securely.
- **cors** – Enable cross-origin requests.
- **ESLint** – Maintain code quality.
- **Nodemon** – Hot reload during development.

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the server

```bash
npm start
```

### Run in development mode (with hot reload)

```bash
npm run dev
```

## Environment variables

```bash
PORT=3001
MONGODB_URI=mongodb://127.0.0.1:27017/wtwr_db
JWT_SECRET=your-secret-key
```

## API Endpoints list

### Auth

- POST /signup — Register a new user
- POST /signin — Login and receive a JWT

### Users

- GET /users/me — Get current user (requires JWT)
- PATCH /users/me — Update current user profile (requires JWT)

### Items

- GET /items — Get all clothing items (public)
- POST /items — Create a clothing item (requires JWT)
- DELETE /items/:itemId — Delete an item (owner only, requires JWT)
- PUT /items/:itemId/likes — Like an item (requires JWT)
- DELETE /items/:itemId/likes — Remove like (requires JWT)
