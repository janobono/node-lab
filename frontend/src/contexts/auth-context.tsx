import React, { FunctionComponent, useEffect, useState } from 'react';

export interface AuthContextValue {
    isLoading: boolean,
    isLoggedIn: boolean,
    authResult: AuthResult | undefined,
    onLogout: () => void,
    onLogin: (username: string, password: string) => void
    onSignUp: (user: User, password: string) => void
}

export interface User {
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface AuthResult {
    user: User,
    token: string
}

const AuthContext = React.createContext<AuthContextValue>({
    isLoading: false,
    isLoggedIn: false,
    authResult: undefined,
    onLogout: () => {
    },
    onLogin: (email, password) => {
    },
    onSignUp: (user, password) => {
    }
});

export const AuthContextProvider: FunctionComponent = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authResult, setAuthResult] = useState<AuthResult>();

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const onAuthResponse = async (response: Response) => {
        if (response.status === 200 || response.status === 201) {
            const result: AuthResult = await response.json();
            localStorage.setItem('isLoggedIn', '1');
            localStorage.setItem('authResult', JSON.stringify(result));
            setIsLoggedIn(true);
            setAuthResult(result);
        } else {
            throw new Error('Wrong response status!');
        }
    }

    const onAuthError = (error: any) => {
        console.log(error);
        logout();
    }

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                '/api/node-lab-backend/auth/authenticate',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                });
            await onAuthResponse(response);
        } catch (error) {
            onAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const signUp = async (user: User, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                '/api/node-lab-backend/auth/sign-in',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...user, password})
                });
            await onAuthResponse(response);
        } catch (error) {
            onAuthError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authResult');
        setIsLoggedIn(false);
        setAuthResult(undefined);
    };

    return (
        <AuthContext.Provider
            value={
                {
                    isLoading,
                    isLoggedIn,
                    authResult,
                    onLogout: logout,
                    onLogin: login,
                    onSignUp: signUp
                }
            }
        >{props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
