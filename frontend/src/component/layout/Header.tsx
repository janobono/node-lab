import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const Header: FunctionComponent = () => {

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink to="/" className="navbar-item">
                    <img src="logo192.png" width="112" height="28" alt="Node Lab"/>
                </NavLink>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink to="/new-todo" className="navbar-item">
                        Create New Todo
                    </NavLink>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <NavLink to="/sign-up" className="button is-primary">
                                <strong>Sign up</strong>
                            </NavLink>
                            <NavLink to="/log-in" className="button is-light">
                                Log in
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
