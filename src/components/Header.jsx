'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('');

  useEffect(() => {
    // Function to update authentication status and user type
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const type = localStorage.getItem('userType');
      setIsAuthenticated(!!token);
      setUserType(type || '');
    };

    // Check auth status on component mount
    checkAuthStatus();

    // Set up listener for localStorage changes in other tabs
    const handleStorageChange = (event) => {
      if (event.key === 'token' || event.key === 'userType') {
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
    localStorage.removeItem('userType');
    setIsAuthenticated(false);
    setUserType('');
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-primary to-green-500 text-white shadow-lg sticky top-0 bg-opacity-80 backdrop-blur-md transition-all duration-300 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6 lg:p-8">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight transform hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer">
            Contract Farming Platform
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
            {isAuthenticated ? (
              <>
                {userType === 'farmer' && (
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
                  </>
                )}
                {userType === 'buyer' && (
                  <>
                    <li>
                      <Link
                        href="/buyers/dashboard"
                        className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/buyers/profile"
                        className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
                      >
                        Buyer Profile
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
                  </>
                )}
                <li>
                  <Link
                    href="/settings"
                    className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    Settings
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
