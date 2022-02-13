import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { db } from '../../db';
import logger from '../../logger';

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('getTodos');
    try {
        const todos = await db.nl_todo.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        res.status(200).json(todos);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}

export const getTodo = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('getTodo', req.params);
    try {
        const id = +req.params.id;
        const todo = await db.nl_todo.findUnique({
            where: {id}
        });
        res.status(200).json(todo);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}

export const addTodo = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('addTodo', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    try {
        const {title, content} = req.body;
        const todo = await db.nl_todo.create({
            data: {
                title,
                content
            }
        });
        res.status(201).json(todo);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}

export const setTodo = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('setTodo', req.params, req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }
    try {
        const id = +req.params.id;
        const {title, content} = req.body;
        const todo = await db.nl_todo.update({
            data: {
                title,
                content
            },
            where: {id}
        });
        res.status(200).json(todo);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}

export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('deleteTodo', req.params);
    try {
        const id = +req.params.id;
        const todo = await db.nl_todo.delete({
            where: {id}
        });
        res.status(200).json(todo);
    } catch (error) {
        logger.error(error);
        res.status(500).json(error);
    }
}
