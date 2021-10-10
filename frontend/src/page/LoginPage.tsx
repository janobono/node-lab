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

        const enteredUsername = usernameInput.current!.value;
        if (enteredUsername.trim().length === 0) {
            setUsernameValid(false);
            return;
        }
        setUsernameValid(true);

        const enteredPassword = passwordInput.current!.value;
        if (enteredPassword.trim().length === 0) {
            setPasswordValid(false);
            return;
        }
        setPasswordValid(true);

        authCtx.onLogin(enteredUsername, enteredPassword);
    }

    return (
        <section className="section">
            <form onSubmit={loginHandler}>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <input className="input" type="text" id="username" ref={usernameInput}/>
                    </div>
                    {!usernameValid && <p className="help is-danger">Invalid username!</p>}
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" id="password" ref={passwordInput}/>
                    </div>
                    {!passwordValid && <p className="help is-danger">Invalid password!</p>}
                </div>
                <Button type={'submit'}>Login</Button>
            </form>
        </section>
    );
};

export default LoginPage;
