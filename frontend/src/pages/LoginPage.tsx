import React, { FormEvent, FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../contexts/auth-context';
import { Alert, AlertIcon, Button, Container, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import TextInput from '../components/form/TextInput';
import PasswordInput from '../components/form/PasswordInput';

const LoginPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const [usernameNotValid, setUsernameNotValid] = useState(false);
    const [passwordNotValid, setPasswordNotValid] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginFailed, setLoginFailed] = useState(false);

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!usernameNotValid && !passwordNotValid) {
            authCtx.onLogin(username, password);
        }
    }

    const firstRun = useRef(true);
    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        if (authCtx.payload) {
            setLoginFailed(false);
            navigate('/');
        } else {
            setLoginFailed(true);
        }
    }, [authCtx.payload, navigate]);

    return (
        <Container maxW="container.sm">
            <form onSubmit={loginHandler}>
                <Stack spacing="4">
                    <TextInput
                        name="username"
                        label="Username"
                        isRequired={true}
                        value={username}
                        setValue={setUsername}
                        notValid={usernameNotValid}
                        setNotValid={setUsernameNotValid}
                        isNotValid={value => value.length === 0}
                        formErrorMessage="Invalid username!"
                    />

                    <PasswordInput
                        name="password"
                        label="Password"
                        isRequired={true}
                        value={password}
                        setValue={setPassword}
                        notValid={passwordNotValid}
                        setNotValid={setPasswordNotValid}
                        isNotValid={value => value.length === 0}
                        formErrorMessage="Invalid password!"
                    />

                    <Button
                        type="submit"
                        disabled={usernameNotValid || passwordNotValid}
                    >Login</Button>
                    {
                        loginFailed &&
                        <Alert
                            status="error"
                            onClick={() => setLoginFailed(false)}
                        ><AlertIcon/>Invalid username or password!</Alert>
                    }
                </Stack>
            </form>
        </Container>
    );
};

export default LoginPage;
