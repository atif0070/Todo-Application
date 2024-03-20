const express = require("express");
const {
  createItemCtrl,
  fetchAllItemsCtrl,
  updateItemsCtrl,
  deleteItemsCtrl,
} = require("../../controllers/todoItems/todoItemsCtrl");
const isLogin = require("../../middlewares/isLogin");

const todoItemsRoute = express.Router();

todoItemsRoute.post("/create/:id", isLogin, createItemCtrl);
todoItemsRoute.get("/fetch-all-items/:id", isLogin, fetchAllItemsCtrl);
todoItemsRoute.put("/update-item/:id", isLogin, updateItemsCtrl);
todoItemsRoute.delete("/delete-item/:id", isLogin, deleteItemsCtrl);

module.exports = todoItemsRoute;
