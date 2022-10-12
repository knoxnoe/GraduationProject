
import { MGClient } from "../db/mongodb.ts";
import Todo from '../types/todo.ts';

const db = MGClient.database("todos"); 
const todoEntity = db.collection<Todo>("todos");


class MongoTodoEntity {
  static instance = todoEntity;

  static async save(todo) {
    todoEntity.insertOne(todo)
  }

  static async get() {
    const cursor = todoEntity.find();
    const todos = await cursor.toArray();
    return todos;
  }

  static async update() {
    
  }

  static async delete() {
    
  }
}

export { MongoTodoEntity };
