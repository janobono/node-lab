import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    Container,
    HStack,
    Icon,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    TableCaption,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure
} from '@chakra-ui/react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

import AuthContext from '../contexts/auth-context';
import TodoContext, { Todo } from '../contexts/todo-context';

const HomePage: FunctionComponent = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const todoCtx = useContext(TodoContext);

    const initArray: Todo[] = [];
    const [todos, setTodos] = useState(initArray);

    const {isOpen, onOpen, onClose} = useDisclosure();
    const selectedTodoId = useRef(-1);

    const deleteTodo = () => {
        todoCtx.deleteTodo(selectedTodoId.current);
        onClose();
    }

    useEffect(() => {
        todoCtx.getAllTodos().then(
            loadedTodos => {
                setTodos(loadedTodos);
            }
        )
    }, [todoCtx, isOpen]);

    return (
        <Container maxW="container.sm">
            <Stack>
                <Table variant="striped" colorScheme="teal">
                    <TableCaption>All Todos</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>id</Th>
                            <Th>title</Th>
                            <Th>content</Th>
                            {authCtx.payload &&
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
                                {authCtx.payload &&
                                    <Td><HStack>
                                        <IconButton
                                            colorScheme="teal"
                                            aria-label="Edit todo"
                                            icon={<Icon as={FaEdit}/>}
                                            onClick={() => navigate('/todos/' + todo.id)}
                                        />
                                        <IconButton
                                            colorScheme="red"
                                            aria-label="Delete todo"
                                            icon={<Icon as={FaTrash}/>}
                                            onClick={() => {
                                                selectedTodoId.current = todo.id ? todo.id : -1;
                                                onOpen();
                                            }}
                                        />
                                    </HStack></Td>
                                }
                            </Tr>)
                        }
                    </Tbody>
                </Table>
                {authCtx.payload &&
                    <Box><IconButton
                        colorScheme="teal"
                        aria-label="Add todo"
                        icon={<Icon as={FaPlus}/>}
                        onClick={() => navigate('/todos/new-todo')}
                    /></Box>
                }
            </Stack>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Delete Confirmation Dialog</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>Are you sure?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={deleteTodo}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default HomePage;
