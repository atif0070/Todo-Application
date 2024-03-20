const Tag = require("../../models/tag/tag");
const TodoItem = require("../../models/todoItem/todoItem");
const TodoItemTag = require("../../models/todoItemTag/todoItemTag");
const appErr = require("../../utils/appErr");

const createTagCtrl = async (req, res, next) => {
  try {
    const todoItemId = req.params.id;
    const { name } = req.body;

    const todoItem = await TodoItem.findByPk(todoItemId);
    if (!todoItem) {
      return next(appErr("TodoItem not found", 404));
    }
    const tag = await Tag.create({ name });
    await TodoItemTag.create({ todoItemId, tagId: tag.tagId });
    return res.json({ success: true, data: tag });
  } catch (error) {
    return next(appErr("Error Occurred"));
  }
};

const fetchTagCtrl = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    return res.json({ success: true, data: tags });
  } catch (error) {
    return next(appErr("Error Occurred"));
  }
};

const updateTagCtrl = async (req, res, next) => {
  try {
    const todoItemId = req.params.id;
    const { name } = req.body;

    const todoItem = await TodoItem.findByPk(todoItemId);
    if (!todoItem) {
      return next(appErr("TodoItem not found", 404));
    }

    const todoItemTag = await TodoItemTag.findOne({
      where: { todoItemId },
      include: [Tag],
    });

    if (todoItemTag && todoItemTag.Tag) {
      await todoItemTag.Tag.update({ name });
      return res.json({ success: true, data: todoItemTag.Tag });
    } else {
      return next(appErr("Tag not found for the TodoItem", 404));
    }
  } catch (error) {
    return next(appErr("Error Occurred"));
  }
};

const deleteTagCtrl = async (req, res, next) => {
  try {
    const todoItemId = req.params.id;

    const todoItemTag = await TodoItemTag.findOne({
      where: { todoItemId },
      include: [Tag],
    });

    if (todoItemTag && todoItemTag.Tag) {
      await todoItemTag.Tag.destroy();
      return res.json({ success: true, data: null });
    } else {
      return next(appErr("Tag not found for the TodoItem", 404));
    }
  } catch (error) {
    return next(appErr("Error Occurred"));
  }
};

module.exports = {
  createTagCtrl,
  fetchTagCtrl,
  updateTagCtrl,
  deleteTagCtrl,
};
