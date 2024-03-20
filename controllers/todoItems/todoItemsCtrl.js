const TodoItem = require("../../models/todoItem/todoItem");
const appErr = require("../../utils/appErr");

const createItemCtrl = async (req, res, next) => {
  const { title, description, dueDate, priority, status } = req.body;
  const userId = req.userId;
  const projectId = req.params.id;

  try {
    const newItem = await TodoItem.create({
      title,
      description,
      dueDate,
      priority,
      status,
      userId,
      projectId,
    });
    res.json({ message: "Todo Item is created", newItem });
  } catch (error) {
    return next(appErr("Error Occured"));
  }
};
const fetchAllItemsCtrl = async (req, res, next) => {
  const userId = req.userId;
  const projectId = req.params.id;

  try {
    const fetchItems = await TodoItem.findAll({ where: { userId, projectId } });

    res.json({ message: "Todo Items Fetched ", fetchItems });
  } catch (error) {
    return next(appErr("Error Occured"));
  }
};
const updateItemsCtrl = async (req, res, next) => {
  const { title, description, dueDate, priority, status } = req.body;
  const todoItemId = req.params.id;
  const userId = req.userId;

  try {
    const todoItem = await TodoItem.findOne({
      where: { todoItemId, userId },
    });

    if (!todoItem) {
      return next(appErr("User does not exist"));
    }

    if (title) todoItem.title = title;
    if (description) todoItem.description = description;
    if (dueDate) todoItem.dueDate = dueDate;
    if (priority) todoItem.priority = priority;
    if (status) todoItem.status = status;

    await todoItem.save();
    res.json({ message: "Items is Updated", todoItem });
  } catch (error) {
    return next(appErr("Error Occured"));
  }
};
const deleteItemsCtrl = async (req, res, next) => {
  const todoItemId = req.params.id;
  const userId = req.userId;

  
  try {
    const todoItem = await TodoItem.findOne({
      where: { todoItemId, userId },
    });

    console.log("Item: ", todoItem);
    if (!todoItem) {
      return next(
        appErr("Todo item does not exist or does not belong to the user")
      );
    }
    await todoItem.destroy();

    res.json({ message: "Todo item is deleted" });
  } catch (error) {
    return next(appErr("Error occurred while deleting the todo item"));
  }
};

module.exports = {
  createItemCtrl,
  fetchAllItemsCtrl,
  updateItemsCtrl,
  deleteItemsCtrl,
};
