import { Router } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos";

const router: Router = Router();

router.get("/todos", getTodos);
router.post("/todos", addTodo)
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
