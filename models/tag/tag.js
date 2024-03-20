const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect");
const TodoItemTag = require("../todoItemTag/todoItemTag");

const Tag = sequelize.define("tag", {
  tagId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Tag.hasMany(TodoItemTag, { foreignKey: "tagId" });
TodoItemTag.belongsTo(Tag,{ foreignKey: "tagId" });

module.exports = Tag;
