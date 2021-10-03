import { Router } from 'express';
import { body } from 'express-validator';

import * as TodoController from '../controller/todo-controller';

const router = Router();

router.get('/', TodoController.getTodos);

router.get('/:id', TodoController.getTodo);

const todoDataHandlers = [
    body('title').trim().notEmpty(),
    body('content').trim().notEmpty()
];

router.post('/', todoDataHandlers, TodoController.addTodo);

router.put('/:id', todoDataHandlers, TodoController.setTodo);

router.delete('/:id', TodoController.deleteTodo);

export default router;
