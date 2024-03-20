const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect");
const User = require("../user/user");
const TodoItem = require("../todoItem/todoItem");

const Project = sequelize.define("project", {
  projectId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Project.hasMany(TodoItem, { foreignKey: "projectId" });
TodoItem.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Project;
