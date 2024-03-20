const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect");

const ActivityLog = sequelize.define("activityLog", {
  logId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  actionType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actionDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  actionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = ActivityLog;
