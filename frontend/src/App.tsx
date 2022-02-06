import React, { FunctionComponent } from 'react';

import { AuthContextProvider } from './context/auth-context';

import Layout from './component/layout/Layout';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const App: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Layout>
                    <AppRoutes/>
                </Layout>
            </AuthContextProvider>
        </BrowserRouter>
    );
}

export default App;
