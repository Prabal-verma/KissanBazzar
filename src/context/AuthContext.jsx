// src/context/AuthContext.jsx
'use client';

// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('userType');
    setUserType(type || '');
    setIsAuthenticated(!!token);
    
  }, [userType]);

// src/context/AuthContext.jsx
const login = (token, type) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userType', type);
  setUserType(type);
  setIsAuthenticated(true);
  
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setUserType('');
    setIsAuthenticated(false);
    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
