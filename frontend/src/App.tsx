import React, { FunctionComponent } from 'react';

import { AuthContextProvider } from './context/auth-context';
import Layout from './component/layout/Layout';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';
import TodoDetailPage from './page/TodoDetailPage';
import NewTodoPage from './page/NewTodoPage';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';

const App: FunctionComponent = () => {
    return (
        <Router>
            <AuthContextProvider>
                <Layout>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/todos"/>
                        </Route>
                        <Route path="/todos" exact>
                            <HomePage/>
                        </Route>
                        <Route path="/todos/:todoId">
                            <TodoDetailPage/>
                        </Route>
                        <Route path="/new-todo">
                            <NewTodoPage/>
                        </Route>
                        <Route path="/log-in">
                            <LoginPage/>
                        </Route>
                        <Route path="/sign-up">
                            <SignUpPage/>
                        </Route>
                        <Route path="*">
                            <NotFoundPage/>
                        </Route>
                    </Switch>
                </Layout>
            </AuthContextProvider>
        </Router>
    );
}

export default App;
