import todoController from "../controllers/todo.controller.ts";
import { Router } from "../dep.ts";

const router = new Router();

router.get("/", ({ response }) => {
    response.body = {
      message: "hello world",
    };
  })
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);

export default router;
