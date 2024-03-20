const Comment = require("../../models/comment/comment");
const TodoItem = require("../../models/todoItem/todoItem");
const appErr = require("../../utils/appErr");

const createCommentCtrl = async (req, res, next) => {
  const todoItemId = req.params.id;
  try {
    const { text } = req.body;
    const userId = req.userId;

    const newComment = await Comment.create({ text, userId, todoItemId });
    res.json({ message: "Comment created successfully", newComment });
  } catch (error) {
    next(appErr("Error occurred while creating the comment"));
  }
};
const fetchCommentCtrl = async (req, res, next) => {
  const todoItemId = req.params.id;
  const userId = req.userId;

  try {
    const comments = await Comment.findAll({
      where: { todoItemId, userId },
    });

    res.json({
      status: "Success",
      comments,
    });
  } catch (error) {
    next(appErr("Error occurred while creating the comment"));
  }
};

const updateCommentCtrl = async (req, res, next) => {
  try {
    const commentId = req.params.id;

    const { text } = req.body;
    const userId = req.userId;

    let comment = await Comment.findOne({ where: { commentId, userId } });
    if (!comment) {
      return next(appErr("Comment not found or does not belong to the user"));
    }

    comment.text = text;
    await comment.save();

    res.json({ message: "Comment updated successfully", comment });
  } catch (error) {
    next(appErr("Error occurred while updating the comment"));
  }
};

const deleteCommentCtrl = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const userId = req.userId;

    let comment = await Comment.findOne({ where: { commentId, userId } });
    if (!comment) {
      return next(appErr("Comment not found or does not belong to the user"));
    }

    await comment.destroy();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(appErr("Error occurred while deleting the comment"));
  }
};

module.exports = {
  createCommentCtrl,
  fetchCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
};
