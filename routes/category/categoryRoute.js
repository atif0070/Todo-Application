const express = require("express");
const isLogin = require("../../middlewares/isLogin");
const {
  createCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
  fetchCategoryCtrl,
} = require("../../controllers/category/category");
const categoryRoute = express.Router();

categoryRoute.post("/create/:id", isLogin, createCategoryCtrl);
categoryRoute.post("/fetch-all-category", isLogin, fetchCategoryCtrl);
categoryRoute.put("/update-category/:id", isLogin, updateCategoryCtrl);
categoryRoute.delete("/delete-category/:id", isLogin, deleteCategoryCtrl);

module.exports = categoryRoute;
