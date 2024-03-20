const express = require("express");
const {
  registerUserCtrl,
  loginUserCtrl,
  fetchAllTodoItemsCtrl,
  updateUserCtrl,
  deleteUserCtrl,
  fetchAllUsersCtrl,
} = require("../../controllers/users/usersCtrl");
const isLogin = require("../../middlewares/isLogin");
const usersRoute = express.Router();

usersRoute.post("/register", registerUserCtrl);
usersRoute.post("/login", loginUserCtrl);
usersRoute.get("/fetch-all-users", fetchAllUsersCtrl);
usersRoute.put("/update", isLogin, updateUserCtrl);
usersRoute.delete("/delete", isLogin, deleteUserCtrl);

module.exports = usersRoute;
