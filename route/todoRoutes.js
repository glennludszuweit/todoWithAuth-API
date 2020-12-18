import express from 'express';
import {
  addTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controller/todoController.js';

const router = express.Router();

router.post('/', addTodo);
router.post('/', getTodos);
router.post('/:id', getTodo);
router.post('/:id', updateTodo);
router.post('/:id', deleteTodo);

export default router;
