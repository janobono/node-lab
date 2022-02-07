import React, { FunctionComponent, useContext } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react'

import Layout from './component/layout/Layout';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import TodoDetailPage from './page/TodoDetailPage';
import LoginPage from './page/LoginPage';
import NewTodoPage from './page/NewTodoPage';
import SignUpPage from './page/SignUpPage';
import NotFoundPage from './page/NotFoundPage';

import AuthContext from './context/auth-context';

export const App: FunctionComponent = () => {
    const authCtx = useContext(AuthContext);

    return (
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/todos"/>}/>
                        <Route path="/todos" element={<HomePage/>}/>
                        <Route path="/todos/:todoId"
                               element={authCtx.isLoggedIn ? <TodoDetailPage/> : <Navigate replace to="/login"/>}/>
                        <Route path="/new-todo"
                               element={authCtx.isLoggedIn ? <NewTodoPage/> : <Navigate replace to="/login"/>}/>
                        <Route path="/log-in" element={<LoginPage/>}/>
                        <Route path="/sign-up" element={<SignUpPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ChakraProvider>
    );
}

export default App;
