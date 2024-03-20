const express = require("express");
const {
  createProjectCtrl,
  fetchProjectCtrl,
  updateProjectCtrl,
  deleteProjectCtrl,
} = require("../../controllers/projects/projectsCtrl");
const isLogin = require("../../middlewares/isLogin");
const projectsRoute = express.Router();

projectsRoute.post("/create", isLogin, createProjectCtrl);
projectsRoute.get("/fetch-all-projects", isLogin, fetchProjectCtrl);
projectsRoute.put("/update-project/:id", isLogin, updateProjectCtrl);
projectsRoute.delete("/delete-project/:id", isLogin, deleteProjectCtrl);

module.exports = projectsRoute;
