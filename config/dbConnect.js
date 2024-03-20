const Sequelize = require("sequelize");

const sequelize = new Sequelize("Todo-Application", "postgres", "12345", {
  host: "localhost",
  dialect: "postgres",
  port: "5432",
  logging: false,
});

// Function to authenticate and establish connection to the database
async function connectToDatabase() {
  try {
    // Authenticate Sequelize instance
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    // Handle authentication error
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, connectToDatabase };
