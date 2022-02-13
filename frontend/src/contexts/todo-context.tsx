import React, { FunctionComponent, useContext } from 'react';
import AuthContext from './auth-context';

export interface Todo {
    id?: number,
    title: string,
    content: string
}

export interface TodoContextValue {
    getAllTodos: () => Promise<Todo[]>,
    getTodo: (id: number) => Promise<Todo | undefined>,
    addTodo: (todo: Todo) => Promise<Todo | undefined>,
    setTodo: (todo: Todo) => Promise<Todo | undefined>,
    deleteTodo: (id: number) => Promise<Todo | undefined>
}

const TodoContext = React.createContext<TodoContextValue>({
    getAllTodos: async () => {
        return [];
    },
    getTodo: async (id) => {
        return undefined;
    },
    addTodo: async (todo) => {
        return undefined;
    },
    setTodo: async (todo) => {
        return undefined;
    },
    deleteTodo: async (id) => {
        return undefined;
    }
});

export const TodoContextProvider: FunctionComponent = (props) => {
    const authCtx = useContext(AuthContext);

    const getAllTodos = async () => {
        try {
            const response = await fetch('/api/node-lab-backend/todos');
            return await response.json();
        } catch (error) {
            console.log(error);
        }
        return [];
    }

    const getTodo = async (id: number) => {
        try {
            const response = await fetch(
                '/api/node-lab-backend/todos/' + id,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.bearer
                    }
                });
            if (response.status === 200) {
                const result: Todo = await response.json();
                return result;
            }
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }

    const addTodo = async (todo: Todo) => {
        try {
            const response = await fetch(
                '/api/node-lab-backend/todos',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.bearer,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...todo})
                });
            if (response.status === 200) {
                const result: Todo = await response.json();
                return result;
            }
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }

    const setTodo = async (todo: Todo) => {
        try {
            const response = await fetch(
                '/api/node-lab-backend/todos/' + todo.id,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.bearer,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...todo})
                });
            if (response.status === 200) {
                const result: Todo = await response.json();
                return result;
            }
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }

    const deleteTodo = async (id: number) => {
        try {
            const response = await fetch(
                '/api/node-lab-backend/todos/' + id,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.bearer
                    }
                });
            if (response.status === 200) {
                const result: Todo = await response.json();
                return result;
            }
        } catch (error) {
            console.log(error);
        }
        return undefined;
    }

    return (
        <TodoContext.Provider
            value={
                {
                    getAllTodos,
                    getTodo,
                    addTodo,
                    setTodo,
                    deleteTodo
                }
            }
        >{props.children}
        </TodoContext.Provider>
    );
}

export default TodoContext;
