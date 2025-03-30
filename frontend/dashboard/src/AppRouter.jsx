// AppRouter.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import AuthProvider from "./authentication/AuthContext";
import ProtectedRoute from "./authentication/ProtectedRoute";

const AppRouter = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/" element={<SignIn/>}/> {/* Optional: Add a route for SignIn */}
                    <Route
                        path="/dashboard/*"
                        element={
                            // <ProtectedRoute>
                                <Dashboard />
                            // </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<h1>404 - Страница не найдена</h1>}/> {/* Ваш текст для 404 */}
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRouter;
