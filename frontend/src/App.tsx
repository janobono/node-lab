import React, { FunctionComponent } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react'

import Layout from './components/layout/Layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditTodoPage from './pages/EditTodoPage';
import LoginPage from './pages/LoginPage';
import NewTodoPage from './pages/NewTodoPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

export const App: FunctionComponent = () => {

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/todos"/>}/>
                        <Route path="/todos" element={<HomePage/>}/>
                        <Route path="/todos/:id" element={<EditTodoPage/>}/>
                        <Route path="/todos/new-todo" element={<NewTodoPage/>}/>
                        <Route path="log-in" element={<LoginPage/>}/>
                        <Route path="sign-up" element={<SignUpPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
