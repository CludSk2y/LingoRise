require("dotenv").config();
const express = require("express");
const { sequelize } = require("./config/database");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
