# WTWR (What to Wear?): Back End

This is the back-end server for the **WTWR (What to Wear?)** application — a weather-based clothing recommendation app. It provides RESTful API endpoints that support user registration, user data management, and clothing item operations such as adding, retrieving, and deleting items. The server is built using **Node.js**, **Express**, and **MongoDB**, with validation, error handling, and modular routing practices.

## Features

- 🧍‍♂️ **User Management**: Create a new user, retrieve user data, and update user profiles.
- 👕 **Clothing Items API**: Add, retrieve, and delete clothing items in the database.
- 🗂 **Routing and Controllers**: Clean and modular code structure for scalability.
- 🧪 **Input Validation and Error Handling**: Built-in error messages and validation using Mongoose and custom middleware.
- 🌐 **MongoDB Database Integration**: Data is stored and managed using MongoDB with Mongoose ODM.

## Technologies and Techniques Used

- **Node.js** – JavaScript runtime for building scalable network applications.
- **Express.js** – Web framework used to handle routing and middleware logic.
- **MongoDB & Mongoose** – NoSQL database with schema modeling using Mongoose.
- **ESLint** – Linting tool to maintain code quality.
- **Nodemon** – Utility for automatically restarting the server during development.
- **Validator.js** – For validating URLs and other input formats.
- **RESTful API Design** – Following REST principles for route and controller structure.

## Getting Started

### Install dependencies:

```bash
npm install
```

Run the server: npm run start

Run in development mode (with hot reload): npm run dev
