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

    const [passwordNotConfirmed, setPasswordNotConfirmed] = useState(false);
    const [signUpFailed, setSignUpFailed] = useState(false);

    const signInHandler = (event: FormEvent) => {
        event.preventDefault();
        const formData = event.target as typeof event.target & {
            username: { value: string };
            firstName: { value: string };
            lastName: { value: string };
            email: { value: string };
            password: { value: string };
            passwordConfirmation: { value: string };
        };
        const isFormValid =
            formData.username.value.length > 0 &&
            formData.firstName.value.length > 0 &&
            formData.lastName.value.length > 0 &&
            formData.email.value.length > 0 && isEmailValid(formData.email.value) &&
            formData.password.value.length > 0 &&
            formData.passwordConfirmation.value.length > 0 &&
            formData.password.value === formData.passwordConfirmation.value;
        if (isFormValid) {
            authCtx.onSignUp(
                {
                    username: formData.username.value,
                    firstName: formData.firstName.value,
                    lastName: formData.lastName.value,
                    email: formData.email.value
                },
                formData.password.value
            );
        } else {
            setPasswordNotConfirmed(formData.password.value !== formData.passwordConfirmation.value);
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
            setSignUpFailed(false);
            navigate('/');
        } else {
            setSignUpFailed(true);
        }
    }, [authCtx.isLoading, authCtx.isLoggedIn, navigate]);

    return (
        <Container maxW="container.sm">
            <form onSubmit={signInHandler}>
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

                    <TextInput
                        name="firstName"
                        label="First name"
                        isRequired={true}
                        notValid={firstNameNotValid}
                        setNotValid={setFirstNameNotValid}
                        isNotValid={value => value.length === 0}
                        formErrorMessage="Invalid first name!"
                    />

                    <TextInput
                        name="lastName"
                        label="Last name"
                        isRequired={true}
                        notValid={lastNameNotValid}
                        setNotValid={setLastNameNotValid}
                        isNotValid={value => value.length === 0}
                        formErrorMessage="Invalid last name!"
                    />

                    <EmailInput
                        name="email"
                        label="Email address"
                        isRequired={true}
                        notValid={emailNotValid}
                        setNotValid={setEmailNotValid}
                        isNotValid={value => value.length === 0 || !isEmailValid(value)}
                        formErrorMessage="Invalid email address!"
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

                    <PasswordInput
                        name="passwordConfirmation"
                        label="Password confirmation"
                        isRequired={true}
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
