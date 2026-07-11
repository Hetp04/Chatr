import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });


    const saveUser = (user) => {
        const userData = {
            username: user.username,
            token: user.token,
            userId: user.userId 
        }
        setCurrentUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const isUserLoggedIn = () => !!currentUser;

    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem('user')
    } 
    
    return (
        <AuthContext.Provider value={{ saveUser, isUserLoggedIn, logout, currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);