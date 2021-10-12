import React, { FormEvent, FunctionComponent, useContext, useRef, useState } from 'react';
import AuthContext from '../context/auth-context';
import Button from '../component/ui/Button';

const LoginPage: FunctionComponent = () => {
    const authCtx = useContext(AuthContext);

    const usernameInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();

        const enteredUsername = usernameInput.current!.value.trim();
        setUsernameValid(enteredUsername.length > 0);

        const enteredPassword = passwordInput.current!.value.trim();
        setPasswordValid(enteredPassword.length > 0);

        if (enteredUsername.length > 0 && enteredPassword.length > 0) {
            authCtx.onLogin(enteredUsername, enteredPassword);
        }
    }

    return (
        <article className="w3-container w3-padding">
            <form onSubmit={loginHandler}>
                <div>
                    <label>Username</label>
                    <div>
                        <input type="text" id="username" ref={usernameInput}/>
                    </div>
                    {!usernameValid && <p>Invalid username!</p>}
                </div>

                <div>
                    <label>Password</label>
                    <div>
                        <input type="password" id="password" ref={passwordInput}/>
                    </div>
                    {!passwordValid && <p className="help is-danger">Invalid password!</p>}
                </div>
                <Button type={'submit'} className="w3-green"
                        disabled={!usernameValid || !passwordValid}>Login</Button>
            </form>
        </article>
    );
};

export default LoginPage;
