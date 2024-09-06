"use client"
// src/components/Header.jsx
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage and update authentication status
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6 lg:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Contract Farming Platform</h1>
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link href="/" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/farmer-profile" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                    Farmer Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="hover:text-secondary transition-colors duration-300 ease-in-out">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/farmers/signin" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                    Farmer Login
                  </Link>
                </li>
                <li>
                  <Link href="/buyers/signin" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                    Buyer Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
