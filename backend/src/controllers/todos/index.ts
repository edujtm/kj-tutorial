import { Response, Request } from "express";
import { getRepository } from 'typeorm';
import Todo from '../../models/todo';


const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoRepo = getRepository(Todo);
    const todos: Todo[] = await todoRepo.find();
    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};


const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<Todo, "name" | "description" | "status">
    const todoRepo = getRepository(Todo);

    const todo = new Todo();
    todo.name = body.name;
    todo.description = body.description;
    todo.status = body.status;

    await todoRepo.save(todo);
    const allTodos: Todo[] = await todoRepo.find();

    res.status(201)
      .json({ message: "Todo Created", todo, todos: allTodos });
  } catch (error) {
    throw error;
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const todoRepo = getRepository(Todo);
    const todo = await todoRepo.findOne(id);
    if (!todo) {
      res.status(400).json({
        error: "This Todo does not exist on the database."
      });
    } else {
      await todoRepo.update(todo.id, { ...body });
      const updateTodo = await todoRepo.findOne(id);
      const allTodos: Todo[] = await todoRepo.find();
      res.status(200).json({
        message: "Todo updated!",
        todo: updateTodo,
        todos: allTodos
      });
    }
  } catch (error) {
    throw error;
  }
}


const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todoRepo = getRepository(Todo);
    const todo = await todoRepo.findOne(req.params.id);
    if (!todo) {
      res.status(400).json({
        error: "This Todo does not exist on the database." 
      });
      return;
    }

    const deletedTodo: Todo = await todoRepo.remove(todo as Todo);
    const allTodos: Todo[] = await todoRepo.find();

    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  } catch (error) {
    throw error;
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo };
