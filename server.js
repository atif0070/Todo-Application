const { connectToDatabase } = require("./config/dbConnect");
const syncModels = require("./config/dbsync");
connectToDatabase();
syncModels();

const express = require("express");
const cors = require('cors');
const usersRoute = require("./routes/users/usersRoute");
const todoItemsRoute = require("./routes/todoItems/todoItemsRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const app = express();

const user = require("./models/user/user");
const todo = require("./models/todoItem/todoItem");
const globalErrHandler = require("./middlewares/globalErrHandler");
const projectsRoute = require("./routes/projects/projectsRoute");
const commentsRoute = require("./routes/comments/commentsRoute");
const tagsRoute = require("./routes/tags/tagsRoute");
const categoryRoute = require("./routes/category/categoryRoute");

app.use(cors())

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/todo-app/users", usersRoute);
app.use("/todo-app/todo-items", todoItemsRoute);
app.use("/todo-app/todo-projects", projectsRoute);
app.use("/todo-app/todo-comments", commentsRoute);
app.use("/todo-app/todo-tags", tagsRoute);
app.use("/todo-app/todo-category", categoryRoute);

//Error Handling
app.use(globalErrHandler);

const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
