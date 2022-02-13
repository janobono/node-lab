import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Center, Container, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import TodoContext from '../contexts/todo-context';
import TodoForm from '../components/form/TodoForm';

const EditTodoPage: FunctionComponent = () => {
    const params = useParams<any>();
    const {id} = params;

    const navigate = useNavigate();
    const todoCtx = useContext(TodoContext);

    const [loaded, setLoaded] = useState(false);

    const editTodo = (title: string, content: string) => {
        if (id) {
            todoCtx.setTodo({id: +id, title, content});
        }
        navigate('/');
    }

    const title = useRef('');
    const content = useRef('');
    useEffect(() => {
        if (id) {
            todoCtx.getTodo(+id)
                .then(todo => {
                    if (todo) {
                        title.current = todo.title;
                        content.current = todo.content;
                        setLoaded(true);
                    } else {
                        navigate('/');
                    }
                });
        } else {
            navigate('/');
        }
    }, []);

    return (
        <Container maxW="container.sm">
            {!loaded && <Center><Spinner/></Center>}
            {loaded &&
                <TodoForm title={title.current} content={content.current} submitButtonLabel="Update"
                          onSubmit={editTodo}/>}
        </Container>
    );
};

export default EditTodoPage;
