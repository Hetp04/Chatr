import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthenticationPage from './Authentication/AuthenticationPage'; 
import Chats from './Chats/Chats'; 
import { useAuth } from './context/AuthContext';

const Main = () => {
    const { isUserLoggedIn } = useAuth()
    return(
        <Router>
            <Routes>
                <Route path="/" element={isUserLoggedIn() ? <Navigate to="/chats" /> : <AuthenticationPage />} />
                <Route path="/chats" element={isUserLoggedIn() ? <Chats /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default Main