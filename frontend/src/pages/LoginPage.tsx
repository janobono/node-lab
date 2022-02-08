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

    const [loginFailed, setLoginFailed] = useState(false);

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();
        const formData = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };
        if (formData.username.value.length > 0 && formData.password.value.length > 0) {
            authCtx.onLogin(formData.username.value, formData.password.value);
        }
    }

    const firstRun = useRef(true);
    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        if (authCtx.isLoading) {
            return;
        }
        if (authCtx.isLoggedIn) {
            setLoginFailed(false);
            navigate('/');
        } else {
            setLoginFailed(true);
        }
    }, [authCtx.isLoading, authCtx.isLoggedIn, navigate]);

    return (
        <Container maxW="container.sm">
            <form onSubmit={loginHandler}>
                <Stack spacing="4">
                    <TextInput
                        name="username"
                        label="Username"
                        isRequired={true}
                        notValid={usernameNotValid}
                        setNotValid={setUsernameNotValid}
                        isNotValid={value => value.length === 0}
                        formErrorMessage="Invalid username!"
                    />

                    <PasswordInput
                        name="password"
                        label="Password"
                        isRequired={true}
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
