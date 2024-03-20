const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect");
const User = require("../user/user");
const TodoItem = require("../todoItem/todoItem");

const Category = sequelize.define("category", {
  categoryId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Category.hasMany(TodoItem, { foreignKey: "categoryId" });
TodoItem.belongsTo(Category,{ foreignKey: "categoryId" }); 

module.exports = Category;
