require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const userRoutes = require("./routes/users");
const clothingItemRoutes = require("./routes/clothingItems");

const { createUser, login } = require("./controllers/users");
const { getClothingItems } = require("./controllers/clothingItems");

const errorHandler = require("./middlewares/errorHandler");
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/NotFoundError");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { validateSignup, validateSignin } = require("./middlewares/validation");

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wtwr_db";

const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signup", validateSignup, createUser);
app.post("/signin", validateSignin, login);

app.get("/items", getClothingItems);

app.use(auth);

app.use("/users", userRoutes);
app.use("/items", clothingItemRoutes);

app.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT);
  })
  .catch(() => {});
