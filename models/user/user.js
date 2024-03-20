const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect");
const TodoItem = require("../todoItem/todoItem");
const Project = require("../project/project");
const Comment = require("../comment/comment");
const Category = require("../category/category");
const ActivityLog = require("../activityLog/activityLog");

const User = sequelize.define("user", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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

User.hasMany(TodoItem, { foreignKey: "userId" });
TodoItem.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Project, { foreignKey: "userId" });
Project.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

User.hasOne(Category, { foreignKey: "userId" });
Category.belongsTo(User, { foreignKey: "userId" });

User.hasMany(ActivityLog, { foreignKey: "userId" });
ActivityLog.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
