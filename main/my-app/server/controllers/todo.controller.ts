import { Context, v4 } from "../dep.ts";
import { MongoTodoEntity } from '../entity/mongo.todo.ts';

export default {
  getAllTodos: async ({ response }: Context) => {

    const todos = await MongoTodoEntity.get();
    
    response.status = 200;
    response.body = {
      success: true,
      data: todos,
    };
  },
  createTodo: async ({request, response}: Context) => {
    const todo = {
      id: v4.generate(),
      todo: 'todo gtw',
      isCompleted: true,
    }
    await MongoTodoEntity.save(todo)
    response.status = 201;
    response.body = {
      success: true,
      data: todo,
    };
  },
  getTodoById: () => {},
  updateTodoById: async () => {},
  deleteTodoById: () => {},
};
