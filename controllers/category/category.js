const Category = require("../../models/category/category");
const TodoItem = require("../../models/todoItem/todoItem");
const appErr = require("../../utils/appErr");
const createCategoryCtrl = async (req, res, next) => {
  const todoItemId = req.params.id;
  const userId = req.userId;
  try {
    const { name } = req.body;
    const category = await Category.create({ name, userId, todoItemId });
    const todoItem = await TodoItem.findByPk(todoItemId);
    if (!todoItem) {
      return next(appErr("TodoItem not found"));
    }
    await todoItem.update({ categoryId: category.categoryId });
    res.json({ success: true, data: category });
  } catch (error) {
    return next(appErr("Error Occurred"));
  }
};

const fetchCategoryCtrl = async (req, res, next) => {
  const userId = req.userId;

  try {
    const categories = await Category.findAll({
      where: { userId },
    });

    if (!categories) {
      res.json({ success: true, data: categories });
    }

    res.status(200).json(categories);
  } catch (error) {
    // Handle errors
    console.error("Error occurred while fetching categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories" });
  }
};
const updateCategoryCtrl = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const { name } = req.body;
    const userId = req.userId;

    const category = await Category.findOne({ where: { categoryId, userId } });
    if (!category) {
      return next(appErr("Category not found", 404));
    }
    category.name = name;
    await category.save();
    res.json({ success: true, data: category });
  } catch (error) {
    return next(appErr("Error Occurred"));
  }
};

const deleteCategoryCtrl = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const userId = req.userId;

    let category = await Category.findOne({ where: { categoryId, userId } });
    if (!category) {
      return next(appErr("category not found or does not belong to the user"));
    }

    await category.destroy();

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    next(appErr("Error occurred while deleting the Category"));
  }
};

module.exports = {
  createCategoryCtrl,
  fetchCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
};
