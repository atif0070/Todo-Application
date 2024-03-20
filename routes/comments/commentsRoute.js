const express = require("express");
const {
  createCommentCtrl,
  updateCommentCtrl,
  deleteCommentCtrl,
  fetchCommentCtrl,
} = require("../../controllers/comments/commentsCtrl");
const isLogin = require("../../middlewares/isLogin");
const commentsRoute = express.Router();

commentsRoute.post("/create/:id", isLogin, createCommentCtrl);
commentsRoute.post("/fetch-all-comments/:id", isLogin, fetchCommentCtrl);
commentsRoute.put("/update-comment/:id", isLogin, updateCommentCtrl);
commentsRoute.delete("/delete-comment/:id", isLogin, deleteCommentCtrl);

module.exports = commentsRoute;
