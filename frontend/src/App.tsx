import React, { FunctionComponent, useContext } from 'react';

import AuthContext from './context/auth-context';
import Layout from './component/layout/Layout';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import HomePage from './page/HomePage';
import NotFoundPage from './page/NotFoundPage';
import TodoDetailPage from './page/TodoDetailPage';
import NewTodoPage from './page/NewTodoPage';

const App: FunctionComponent = () => {
    const ctx = useContext(AuthContext);

    console.log(ctx);

    return (
        <Router>
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
                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}

export default App;
