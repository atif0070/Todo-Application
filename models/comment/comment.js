const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/dbConnect");

const Comment = sequelize.define("comment", {
  commentId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});


module.exports = Comment;
