import type { ActionFunction, LoaderFunction } from 'remix';
import { json } from 'remix';
import { checkToken } from '~/utils/jwt.server';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({request, params}) => {
    const {response, payload} = checkToken(request);
    if (response) {
        return response;
    }
    try {
        const {id} = params;
        if (id) {
            const todo = await db.nl_todo.findUnique({
                where: {id: +id}
            });
            return json(todo, 200);
        } else {
            return json({message: 'Bad request'}, 400);
        }
    } catch (error) {
        console.log(error);
        return json({error}, 500);
    }
};

export const action: ActionFunction = async ({request, params}) => {
    const {id} = params;
    if (id) {
        const {response} = checkToken(request);
        if (response) {
            return response;
        }
        switch (request.method) {
            case 'PUT': {
                return await updateTodo(request, +id);
            }
            case 'DELETE': {
                return await deleteTodo(+id);
            }
        }
    }
    return json({message: 'Method not allowed'}, 405);
};

const updateTodo = async (request: Request, id: number) => {
    try {
        const {title, content} = await request.json();
        const todo = await db.nl_todo.update({
            data: {
                title,
                content
            },
            where: {id}
        });
        return json(todo, 200);
    } catch (error) {
        console.log(error);
        return json({error}, 500);
    }
}

const deleteTodo = async (id: number) => {
    try {
        const todo = await db.nl_todo.delete({
            where: {id}
        });
        return json(todo, 200);
    } catch (error) {
        console.log(error);
        return json({error}, 500);
    }
}
