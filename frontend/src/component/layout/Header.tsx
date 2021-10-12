import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import Button from '../ui/Button';

const Header: FunctionComponent = () => {
    const authCtx = useContext(AuthContext);

    return (
        <React.Fragment>
            <header className="w3-container w3-teal">
                <h1>Todos</h1>
            </header>
            <nav className="w3-bar w3-black">
                <NavLink to="/" className="w3-bar-item w3-button w3-green">Home</NavLink>
                {authCtx.isLoggedIn ?
                    <Button onClick={authCtx.onLogout}>Log out</Button>
                    :
                    <React.Fragment>
                        <NavLink to="/sign-up" className="w3-bar-item w3-button">Sign up</NavLink>
                        <NavLink to="/log-in" className="w3-bar-item w3-button">Log in</NavLink>
                    </React.Fragment>
                }
            </nav>
        </React.Fragment>
    );
}

export default Header;
