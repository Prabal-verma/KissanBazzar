'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Function to update authentication status
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    // Check auth status on component mount
    checkAuthStatus();

    // Set up listener for localStorage changes in other tabs
    const handleStorageChange = (event) => {
      if (event.key === 'token') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-primary to-green-500 text-white shadow-lg sticky top-0 bg-opacity-80 backdrop-blur-md transition-all duration-300 z-50  rounded-md">
  <div className="container mx-auto flex justify-between items-center p-2 md:p-6 lg:p-6">
    <Link href="/">
    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight transform hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer">
      KissanBazzar
    </h1> </Link>
    <nav>
      <ul className="flex space-x-6 text-lg font-medium">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                href="/farmers/dashboard"
                className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/farmers/profile"
                className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Farmer Profile
              </Link>
            </li>
            <li>
              <Link
                href="/contracts"
                className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
              >
                My Contracts
              </Link>
            </li>
            <li>
              <Link
                href="/buyers/markets"
                className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Market
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-300 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/farmers/signin"
                className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Farmer Login
              </Link>
            </li>
            <li>
              <Link
                href="/buyers/signin"
                className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
              >
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
