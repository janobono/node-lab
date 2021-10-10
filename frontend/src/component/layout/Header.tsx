import React, { FunctionComponent, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import Button from '../ui/Button';

const Header: FunctionComponent = () => {
    const authCtx = useContext(AuthContext);

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink to="/" className="navbar-item">
                        All Todos
                    </NavLink>
                    {authCtx.isLoggedIn ?? <NavLink to="/new-todo" className="navbar-item">Create New Todo</NavLink>}
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {authCtx.isLoggedIn ?
                                <Button className="is-light" onClick={authCtx.onLogout}>
                                    Log out
                                </Button>
                                :
                                <React.Fragment>
                                    <NavLink to="/sign-up" className="navbar-item is-primary">
                                        <strong>Sign up</strong>
                                    </NavLink>
                                    <NavLink to="/log-in" className="navbar-item is-light">
                                        Log in
                                    </NavLink>
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
