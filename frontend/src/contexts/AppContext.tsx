import React, { FunctionComponent } from 'react';
import { AuthContextProvider } from './auth-context';
import { TodoContextProvider } from './todo-context';

const AppContext: FunctionComponent = (props) => {
    return (
        <AuthContextProvider>
            <TodoContextProvider>
                {props.children}
            </TodoContextProvider>
        </AuthContextProvider>
    );
}

export default AppContext;
