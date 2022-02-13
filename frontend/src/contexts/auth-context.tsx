import React, { FunctionComponent, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

interface TokenPayload {
    exp: number,
    iat: number,
    iss: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface Payload {
    exp: Date,
    iat: Date,
    iss: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface SignUpFormData {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string
}

export interface AuthContextValue {
    bearer: String | undefined,
    payload: Payload | undefined,
    onLogout: () => void,
    onLogin: (username: string, password: string) => Promise<number>
    onSignUp: (signUpFormData: SignUpFormData) => Promise<number>
}

const AuthContext = React.createContext<AuthContextValue>({
    bearer: undefined,
    payload: undefined,
    onLogout: () => {
    },
    onLogin: async (email, password) => {
        return 500;
    },
    onSignUp: async (signUpFormData: SignUpFormData) => {
        return 500;
    }
});

export const AuthContextProvider: FunctionComponent = (props) => {
    const [bearer, setBearer] = useState<String>();
    const [payload, setPayload] = useState<Payload>();

    const decodeToken = (token: string) => {
        const decodedPayload = jwt_decode<TokenPayload>(token);
        if (decodedPayload) {
            if (decodedPayload.exp * 1000 > Date.now()) {
                localStorage.setItem('token', token);
                setBearer(token);
                setPayload({
                    exp: new Date(decodedPayload.exp * 1000),
                    iat: new Date(decodedPayload.iat * 1000),
                    iss: decodedPayload.iss,
                    username: decodedPayload.username,
                    firstName: decodedPayload.firstName,
                    lastName: decodedPayload.lastName,
                    email: decodedPayload.email
                })
            }
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            decodeToken(storedToken);
        }
    }, []);

    const login = async (username: string, password: string) => {
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
            if (response.status === 200) {
                const {bearer} = await response.json();
                decodeToken(bearer);
            }
            return response.status;
        } catch (error) {
            console.log(error);
            logout();
        }
        return 500;
    };

    const signUp = async (signUpFormData: SignUpFormData) => {
        try {
            const response = await fetch(
                '/api/node-lab-backend/auth/sign-in',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...signUpFormData})
                });
            if (response.status === 201) {
                const {bearer} = await response.json();
                decodeToken(bearer);
            }
            return response.status;
        } catch (error) {
            console.log(error);
            logout();
        }
        return 500;
    };

    const logout = () => {
        localStorage.removeItem('token')
        setBearer(undefined);
        setPayload(undefined);
    };

    return (
        <AuthContext.Provider
            value={
                {
                    bearer,
                    payload,
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
