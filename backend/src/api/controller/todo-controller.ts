import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../../logger';
import * as todoRepository from '../../dao/repository/todo-repository';
import { TodoData } from '../../dao/repository/todo-repository';

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
    logger.debug('getTodos');
    todoRepository.getTodos()
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error));
}

export const getTodo = (req: Request, res: Response, next: NextFunction) => {
    logger.debug('getTodo', req.params);
    const id = req.params.id;
    todoRepository.getTodo(id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error));
}

export const addTodo = (req: Request, res: Response, next: NextFunction) => {
    logger.debug('addTodo', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const data = req.body as TodoData;
    todoRepository.addTodo(data)
        .then(result => res.status(201).json(result))
        .catch(error => res.status(500).json(error));
}

export const setTodo = (req: Request, res: Response, next: NextFunction) => {
    logger.debug('setTodo', req.params, req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const id = req.params.id;
    const data = req.body as TodoData;
    todoRepository.setTodo(id, data)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error));
}

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    logger.debug('deleteTodo', req.params);
    const id = req.params.id;
    todoRepository.deleteTodo(id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error));
}
