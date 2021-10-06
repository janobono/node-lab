import React, { BaseSyntheticEvent, FunctionComponent, useContext, useEffect, useState } from 'react';

import classes from './Login.module.css';

import Card from '../ui/card/Card';
import Button from '../ui/button/Button';
import AuthContext from '../../context/auth-context';

const Login: FunctionComponent = () => {
    const ctx = useContext(AuthContext);

    const [enteredUsername, setEnteredUsername] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(true);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            console.log('Checking form validity');
            setFormIsValid(
                enteredUsername.trim().length > 0 && enteredPassword.trim().length > 6
            );
        }, 500);
        return () => {
            console.log('Clean up');
            clearTimeout(timeout);
        }
    }, [enteredUsername, enteredPassword]);

    const usernameChangeHandler = (event: BaseSyntheticEvent) => {
        setEnteredUsername(event.target.value);
    };

    const passwordChangeHandler = (event: BaseSyntheticEvent) => {
        setEnteredPassword(event.target.value);
    };

    const validateUsernameHandler = () => {
        setUsernameIsValid(enteredUsername.trim().length > 0);
    };

    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6);
    };

    const submitHandler = (event: BaseSyntheticEvent) => {
        event.preventDefault();
        ctx.onLogin(enteredUsername, enteredPassword);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${
                        usernameIsValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="username">username</label>
                    <input
                        type="text"
                        id="username"
                        value={enteredUsername}
                        onChange={usernameChangeHandler}
                        onBlur={validateUsernameHandler}
                    />
                </div>
                <div
                    className={`${classes.control} ${
                        passwordIsValid === false ? classes.invalid : ''
                    }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>Login</Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
