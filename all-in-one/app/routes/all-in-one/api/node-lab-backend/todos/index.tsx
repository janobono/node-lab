import type { ActionFunction, LoaderFunction } from 'remix';
import { json } from 'remix';
import { db } from '~/utils/db.server';
import { checkToken, Payload } from '~/utils/jwt.server';

export const loader: LoaderFunction = async ({request}) => {
    const todos = await db.nl_todo.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    return json(todos, 200);
};

export const action: ActionFunction = async ({request}) => {
    if (request.method === 'POST') {
        const {response, payload} = checkToken(request);
        if (response) {
            return response;
        }
        if (payload) {
            return await addTodo(request, payload);
        }
    }
    return json({message: 'Method not allowed'}, 405);
};

const addTodo = async (request: Request, payload: Payload) => {
    try {
        const {title, content} = await request.json();
        const todo = await db.nl_todo.create({
            data: {
                title,
                content
            }
        });
        return json(todo, 201);
    } catch (error) {
        console.log(error);
        return json({error}, 500);
    }
}
