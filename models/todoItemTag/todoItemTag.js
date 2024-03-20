const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect");

const TodoItemTag = sequelize.define("todoItemTag", {
  todoItemTagId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
});

module.exports = TodoItemTag;
