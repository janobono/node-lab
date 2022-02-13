import React, { FormEvent, FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { Alert, AlertIcon, Button, Container, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import AuthContext from '../contexts/auth-context';
import TextInput from '../components/form/TextInput';
import EmailInput, { isEmailValid } from '../components/form/EmailInput';
import PasswordInput from '../components/form/PasswordInput';

const SignUpPage: FunctionComponent = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const [usernameNotValid, setUsernameNotValid] = useState(false);
    const [firstNameNotValid, setFirstNameNotValid] = useState(false);
    const [lastNameNotValid, setLastNameNotValid] = useState(false);
    const [emailNotValid, setEmailNotValid] = useState(false);
    const [passwordNotValid, setPasswordNotValid] = useState(false);
    const [passwordConfirmationNotValid, setPasswordConfirmationNotValid] = useState(false);

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('@');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [passwordNotConfirmed, setPasswordNotConfirmed] = useState(false);
    const [signUpFailed, setSignUpFailed] = useState(false);

    const signInHandler = (event: FormEvent) => {
        event.preventDefault();
        if (!usernameNotValid &&
            !firstNameNotValid &&
            !lastNameNotValid &&
            !emailNotValid &&
            !passwordNotValid &&
            !passwordConfirmationNotValid) {

            if (password !== passwordConfirmation) {
                setPasswordNotConfirmed(true);
                return;
            }

            authCtx.onSignUp(
                {
                    username,
                    password,
                    firstName,
                    lastName,
                    email
                }
            );
        }
    }

    const firstRun = useRef(true);
    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        if (authCtx.payload) {
            setSignUpFailed(false);
            navigate('/');
        } else {
            setSignUpFailed(true);
        }
    }, [authCtx.payload, navigate]);

    return (
        <Container maxW="container.sm">
            <form onSubmit={signInHandler}>
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

                    <TextInput
                        name="firstName"
                        label="First name"
                        isRequired={true}
                        value={firstName}
                        setValue={setFirstName}
                        notValid={firstNameNotValid}
                        setNotValid={setFirstNameNotValid}
                        isNotValid={value => value.length === 0}
                        formErrorMessage="Invalid first name!"
                    />

                    <TextInput
                        name="lastName"
                        label="Last name"
                        isRequired={true}
                        value={lastName}
                        setValue={setLastName}
                        notValid={lastNameNotValid}
                        setNotValid={setLastNameNotValid}
                        isNotValid={value => value.length === 0}
                        formErrorMessage="Invalid last name!"
                    />

                    <EmailInput
                        name="email"
                        label="Email address"
                        isRequired={true}
                        value={email}
                        setValue={setEmail}
                        notValid={emailNotValid}
                        setNotValid={setEmailNotValid}
                        isNotValid={value => value.length === 0 || !isEmailValid(value)}
                        formErrorMessage="Invalid email address!"
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

                    <PasswordInput
                        name="passwordConfirmation"
                        label="Password confirmation"
                        isRequired={true}
                        value={passwordConfirmation}
                        setValue={setPasswordConfirmation}
                        notValid={passwordConfirmationNotValid}
                        setNotValid={setPasswordConfirmationNotValid}
                        isNotValid={value => value.length === 0}
                        formErrorMessage="Invalid password!"
                    />
                    {
                        passwordNotConfirmed &&
                        <Alert
                            status="error"
                            onClick={() => setPasswordNotConfirmed(false)}
                        ><AlertIcon/>Password and Password confirmation must have same value!</Alert>
                    }

                    <Button
                        type="submit"
                        disabled={usernameNotValid || firstNameNotValid || lastNameNotValid || emailNotValid || passwordNotValid || passwordConfirmationNotValid}
                    >Sign Up</Button>
                    {
                        signUpFailed &&
                        <Alert
                            status="error"
                            onClick={() => setSignUpFailed(false)}
                        ><AlertIcon/>Sign Up failed!</Alert>
                    }
                </Stack>
            </form>
        </Container>
    );
};

export default SignUpPage;
