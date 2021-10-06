import React, { FunctionComponent, useContext } from 'react';

import Login from './component/login/Login';
import Home from './component/home/Home';
import MainHeader from './component/header/MainHeader';

import AuthContext from './context/auth-context';

const App: FunctionComponent = () => {
    const ctx = useContext(AuthContext);

    console.log(ctx);

    return (
        <React.Fragment>
            <MainHeader/>
            <main>
                {!ctx.isLoggedIn && <Login/>}
                {ctx.isLoggedIn && <Home/>}
            </main>
        </React.Fragment>
    );
}

export default App;
