const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect");
const Comment = require("../comment/comment");
const User = require("../user/user");
const Tag = require("../tag/tag");
const TodoItemTag = require("../todoItemTag/todoItemTag");

const TodoItem = sequelize.define("todoItem", {
  todoItemId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  priority: {
    type: DataTypes.STRING,
  },
  status: {
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

TodoItem.hasMany(Comment, { foreignKey: "todoItemId" });
Comment.belongsTo(TodoItem, { foreignKey: "todoItemId" });

TodoItem.belongsToMany(Tag, { through: TodoItemTag, foreignKey: "todoItemId" });
Tag.belongsToMany(TodoItem, { through: TodoItemTag, foreignKey: "tagId" });

module.exports = TodoItem;
