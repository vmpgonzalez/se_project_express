require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/users");
const clothingItemRoutes = require("./routes/clothingItems");
const { NOT_FOUND } = require("./utils/errors");

const { createUser, login } = require("./controllers/users");
const { getClothingItems } = require("./controllers/clothingItems");

const auth = require("./middlewares/auth");

const PORT = process.env.PORT || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/wtwr_db";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);

app.get("/items", getClothingItems);

app.use(auth);

app.use("/users", userRoutes);

app.use("/items", clothingItemRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Route not found" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
