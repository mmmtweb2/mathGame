import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState(null);

    function login(username, type) {
        setCurrentUser({ username });
        setUserType(type);
        return true;
    }

    function logout() {
        setCurrentUser(null);
        setUserType(null);
    }

    const value = {
        currentUser,
        userType,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}