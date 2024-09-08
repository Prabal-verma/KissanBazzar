// src/components/Header.jsx
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isAuthenticated, userType, logout } = useAuth();
  const [currentUserType, setCurrentUserType] = useState(userType);

  useEffect(() => {
    // Update local state when userType changes
    setCurrentUserType(userType);
  }, [userType]);

  const renderUserLinks = () => {
    if (currentUserType === 'farmer') {
      return (
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
      );
    }
    if (currentUserType === 'buyer') {
      return (
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
              href="/buyers/markets"
              className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Market
            </Link>
          </li>
        </>
      );
    }
    return null;
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
                {renderUserLinks()}
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
                    onClick={logout}
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
