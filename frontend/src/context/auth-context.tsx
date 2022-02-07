import React, { FunctionComponent, useEffect, useState } from 'react';

export interface AuthContextValue {
    isLoading: boolean,
    isLoggedIn: boolean,
    authResult: AuthResult | undefined,
    onLogout: () => void,
    onLogin: (username: string, password: string) => void
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

    const login = async (username: string, password: string) => {
        console.log('AuthContextProvider.login');
        try {
            setIsLoading(true);
            const response = await fetch('/api/node-lab-backend/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            if (response.status === 200) {
                const result: AuthResult = await response.json()
                localStorage.setItem('isLoggedIn', '1');
                localStorage.setItem('authResult', JSON.stringify(result));
                setIsLoggedIn(true);
                setAuthResult(result);
            } else {
                logout();
            }
        } catch (error) {
            console.log(error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        console.log('AuthContextProvider.logout');
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
                    onLogin: login
                }
            }
        >{props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
