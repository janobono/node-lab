import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Center,
    Container,
    Icon,
    IconButton,
    Spinner,
    Stack,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import { FaEdit, FaPlus } from 'react-icons/fa';

import AuthContext from '../contexts/auth-context';
import TodoContext, { Todo } from '../contexts/todo-context';

const HomePage: FunctionComponent = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const todoCtx = useContext(TodoContext);

    const initArray: Todo[] = [];
    const [todos, setTodos] = useState(initArray);

    useEffect(() => {
        todoCtx.getAllTodos().then(
            loadedTodos => {
                setTodos(loadedTodos);
            }
        )
    }, []);

    return (
        <Container maxW="container.sm">
            {todoCtx.isLoading && <Center><Spinner/></Center>}
            {!todoCtx.isLoading &&
                <Stack>
                    <Table variant="striped" colorScheme="teal">
                        <TableCaption>All Todos</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>id</Th>
                                <Th>title</Th>
                                <Th>content</Th>
                                {authCtx.isLoggedIn &&
                                    <Th/>
                                }
                            </Tr>
                        </Thead>
                        <Tbody>
                            {todos.map(todo =>
                                <Tr key={todo.id}>
                                    <Td>{todo.id}</Td>
                                    <Td>{todo.title}</Td>
                                    <Td>{todo.content}</Td>
                                    {authCtx.isLoggedIn &&
                                        <Td><IconButton
                                            colorScheme="teal"
                                            aria-label="Call Segun"
                                            icon={<Icon as={FaEdit}/>}
                                            onClick={() => navigate('/todos/' + todo.id)}
                                        /></Td>
                                    }
                                </Tr>)
                            }
                        </Tbody>
                    </Table>
                    {authCtx.isLoggedIn &&
                        <Box><IconButton
                            colorScheme="teal"
                            aria-label="Add todo"
                            icon={<Icon as={FaPlus}/>}
                            onClick={() => navigate('/todos/new-todo')}
                        /></Box>
                    }
                </Stack>
            }
        </Container>
    );
};

export default HomePage;
