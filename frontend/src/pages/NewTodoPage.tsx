import React, { FunctionComponent, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Container } from '@chakra-ui/react';

import TodoContext from '../contexts/todo-context';
import TodoForm from '../components/form/TodoForm';

const NewTodoPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const todoCtx = useContext(TodoContext);

    const addTodo = (title: string, content: string) => {
        todoCtx.addTodo({title, content});
        navigate('/');
    }

    return (
        <Container maxW="container.sm">
            <TodoForm submitButtonLabel="Add" onSubmit={addTodo}/>
        </Container>
    );
};

export default NewTodoPage;
