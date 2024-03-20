const { sequelize } = require("./dbConnect");

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
};

module.exports = syncModels;
