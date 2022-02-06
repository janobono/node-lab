import React, { FunctionComponent, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';
import TodoDetailPage from './page/TodoDetailPage';
import NewTodoPage from './page/NewTodoPage';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import AuthContext from './context/auth-context';

const AppRoutes: FunctionComponent = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<Navigate replace to="/todos"/>}/>
            <Route path="/todos" element={<HomePage/>}/>
            <Route path="/todos/:todoId" element={authCtx.isLoggedIn ? <TodoDetailPage/> : <LoginPage/>}/>
            <Route path="/new-todo" element={authCtx.isLoggedIn ? <NewTodoPage/> : <LoginPage/>}/>
            <Route path="/log-in" element={<LoginPage/>}/>
            <Route path="/sign-up" element={<SignUpPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default AppRoutes;
