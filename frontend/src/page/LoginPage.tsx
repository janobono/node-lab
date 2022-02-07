import React, { FormEvent, FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../context/auth-context';
import { Badge, Box, Button, Container, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

const LoginPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    const isValueValid = (value: string | undefined) => {
        return value ? value.length > 0 : false;
    }

    const loginHandler = (event: FormEvent) => {
        event.preventDefault();
        const formData = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };
        let isFormValid = true;
        if (!isValueValid(formData.username.value)) {
            isFormValid = false;
            setUsernameValid(false);
        }
        if (!isValueValid(formData.password.value)) {
            isFormValid = false;
            setPasswordValid(false);
        }
        if (isFormValid) {
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
    }, [authCtx.isLoading, authCtx.isLoggedIn]);

    return (
        <Container maxW="container.sm">
            <form onSubmit={loginHandler}>
                <Stack spacing="4">
                    <Box>
                        <Text align="left">Username</Text>
                        <Input name="username"
                               onChange={(event) => setUsernameValid(isValueValid(event.target.value))}
                               onBlur={(event) => {
                                   if (!event.currentTarget.contains(event.relatedTarget)) {
                                       setUsernameValid(isValueValid(event.target.value))
                                   }
                               }}
                        />
                        {!usernameValid && <Badge colorScheme="red">Invalid username!</Badge>}
                    </Box>

                    <Box>
                        <Text>Password</Text>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} name="password"
                                   onChange={(event) => setPasswordValid(isValueValid(event.target.value))}
                                   onBlur={(event) => {
                                       if (!event.currentTarget.contains(event.relatedTarget)) {
                                           setPasswordValid(isValueValid(event.target.value))
                                       }
                                   }}
                            />
                            <InputRightElement>
                                <Button onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {!passwordValid && <Badge colorScheme="red">Invalid password!</Badge>}
                    </Box>

                    <Button type="submit" disabled={!usernameValid || !passwordValid}>Login</Button>
                    {loginFailed && <Badge colorScheme="red">Invalid username or password!</Badge>}
                </Stack>
            </form>
        </Container>
    );
};

export default LoginPage;
