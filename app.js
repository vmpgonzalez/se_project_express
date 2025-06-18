const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const clothingItemRoutes = require("./routes/clothingItems");
const { NOT_FOUND } = require("./utils/errors");

const app = express();
const PORT = 3001;

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "684b3755d0a11f90802da614",
  };
  next();
});

app.use("/users", userRoutes);
app.use("/items", clothingItemRoutes);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Route not found" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
