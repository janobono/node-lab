import { Router } from 'express';
import { body } from 'express-validator';
import * as TodoController from '../controller/todo-controller';
import { checkTokenHandler } from '../../jwt';

const router = Router();

router.get('/', TodoController.getTodos);

router.get('/:id', checkTokenHandler, TodoController.getTodo);

const todoDataHandlers = [
    body('title').trim().notEmpty().isLength({max: 255}).isString(),
    body('content').trim().notEmpty().escape()
];

router.post('/', checkTokenHandler, todoDataHandlers, TodoController.addTodo);

router.put('/:id', checkTokenHandler, todoDataHandlers, TodoController.setTodo);

router.delete('/:id', checkTokenHandler, TodoController.deleteTodo);

export default router;
