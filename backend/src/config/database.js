const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialisation dyal Sequelize m3a PostgreSQL b DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Ila bghiti t-chof SQL queries f console, rddha true
  dialectOptions: {
    // SSL ila konti k-t-st3ml database m-hostiya (bhal Supabase wla Neon)
    ssl:
      process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Database connected successfully via Sequelize.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
