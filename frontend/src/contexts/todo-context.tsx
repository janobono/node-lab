import React, { FunctionComponent, useContext, useState } from 'react';
import AuthContext from './auth-context';

export interface Todo {
    id?: number,
    title: string,
    content: string
}

export interface TodoContextValue {
    isLoading: boolean,
    getAllTodos: () => Promise<Todo[]>,
    getTodo: (id: number) => Promise<Todo | undefined>,
    addTodo: (todo: Todo) => void,
    setTodo: (todo: Todo) => void,
    deleteTodo: (id: number) => void
}

const TodoContext = React.createContext<TodoContextValue>({
    isLoading: false,
    getAllTodos: async () => {
        return [];
    },
    getTodo: async (id) => {
        return undefined;
    },
    addTodo: async (todo) => {
    },
    setTodo: async (todo) => {
    },
    deleteTodo: async (id) => {
    }
});

export const TodoContextProvider: FunctionComponent = (props) => {
    const authCtx = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const getAllTodos = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/node-lab-backend/todos');
            return await response.json();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        return [];
    }

    const getTodo = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                '/api/node-lab-backend/todos/' + id,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.authResult?.token
                    }
                });
            if (response.status === 200) {
                const result: Todo = await response.json();
                return result;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const addTodo = async (todo: Todo) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                '/api/node-lab-backend/todos',
                {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.authResult?.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...todo})
                });
            const result: Todo = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const setTodo = async (todo: Todo) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                '/api/node-lab-backend/todos/' + todo.id,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.authResult?.token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...todo})
                });
            const result: Todo = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteTodo = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                '/api/node-lab-backend/todos/' + id,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + authCtx.authResult?.token
                    }
                });
            const result: Todo = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <TodoContext.Provider
            value={
                {
                    isLoading,
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
