import React, { FunctionComponent, useEffect, useState } from 'react';

export interface AuthContextValue {
    isLoggedIn: boolean,
    onLogout: () => void,
    onLogin: (username: string, password: string) => void
}

const AuthContext = React.createContext<AuthContextValue>({
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: (email, password) => {
    }
});

export const AuthContextProvider: FunctionComponent = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
        if (storedUserLoggedInInformation === '1') {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (username: string, password: string) => {
        console.log('AuthContextProvider.login');
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    const logout = () => {
        console.log('AuthContextProvider.logout');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={
                {
                    isLoggedIn: isLoggedIn,
                    onLogout: logout,
                    onLogin: login
                }
            }
        >{props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;