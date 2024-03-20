const express = require("express");
const {
  createTagCtrl,
  fetchTagCtrl,
  updateTagCtrl,
  deleteTagCtrl,
} = require("../../controllers/tags/tagsCtrl");
const isLogin = require("../../middlewares/isLogin");
const tagsRoute = express.Router();

tagsRoute.post("/create/:id", isLogin, createTagCtrl);
tagsRoute.get("/fetch-all-tag/:id", isLogin, fetchTagCtrl);
tagsRoute.put("/update-tag/:id", isLogin, updateTagCtrl);
tagsRoute.delete("/delete-tag/:id", isLogin, deleteTagCtrl);

module.exports = tagsRoute;
