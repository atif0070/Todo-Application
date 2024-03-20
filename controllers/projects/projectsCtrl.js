const Project = require("../../models/project/project");
const appErr = require("../../utils/appErr");

const createProjectCtrl = async (req, res, next) => {
  const { name, description } = req.body;
  const userId = req.userId;

  try {
    const newProject = await Project.create({
      name,
      description,
      userId,
    });

    res.json({ message: "Project created successfully", newProject });
  } catch (error) {
    next(appErr("Error occurred while creating the project"));
  }
};

const fetchProjectCtrl = async (req, res, next) => {
  const userId = req.userId;

  try {
    const projects = await Project.findAll({ where: { userId } });
    res.json({ projects });
  } catch (error) {
    next(appErr("Error occurred while fetching projects"));
  }
};

const updateProjectCtrl = async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.userId;
  const { name, description } = req.body;

  try {
    const project = await Project.findOne({ where: { projectId, userId } });

    if (!project) {
      return next(appErr("Project not found or does not belong to the user"));
    }

    if (name) project.name = name;
    if (description) project.description = description;

    await project.save();

    res.json({ message: "Project updated successfully", project });
  } catch (error) {
    next(appErr("Error occurred while updating the project"));
  }
};

const deleteProjectCtrl = async (req, res, next) => {
  const projectId = req.params.id;
  const userId = req.userId;

  try {
    const project = await Project.findOne({ where: { projectId, userId } });

    if (!project) {
      return next(appErr("Project not found or does not belong to the user"));
    }

    await project.destroy();

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    next(appErr("Error occurred while deleting the project"));
  }
};

module.exports = {
  createProjectCtrl,
  fetchProjectCtrl,
  updateProjectCtrl,
  deleteProjectCtrl,
};
