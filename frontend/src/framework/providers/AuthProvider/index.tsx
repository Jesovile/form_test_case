import React, {PropsWithChildren, useContext, useMemo, useState} from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    authorize: (jwt: string, refreshToken: string) => void;
}

const AuthContext = React.createContext<AuthContextType>({
    isAuthenticated: false,
    logout: () => Promise.resolve(),
    authorize: () => {},
});

const AuthProvider = (props: PropsWithChildren) => {
    const {children} = props;
    const isPreviouslyLogged = !!localStorage.getItem('access_token');
    const [isAuthenticated, setIsAuthenticated] = useState(isPreviouslyLogged);

    const authorize = (jwt: string, refreshToken: string) => {
        localStorage.setItem('access_token', jwt);
        localStorage.setItem('refresh_token', refreshToken);
        setIsAuthenticated(true);
    }

    const logout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        window.location.href="/login";
    }

    const contextInstance = useMemo<AuthContextType>(() => ({
        isAuthenticated,
        logout,
        authorize,
    }), [isAuthenticated]);

    return (
        <AuthContext.Provider value={contextInstance}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;