// src/components/Header.jsx
"use client";

import Link from 'next/link';
import React from 'react';

function Header() {
  const isAuthenticated = true; // replace with actual authentication check
  const userRole = 'farmer'; // replace with actual role check

  const handleLogout = () => {
    // Handle logout
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
            <li>
              <Link href="/contracts" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Contracts
              </Link>
            </li>
            <li>
              {isAuthenticated && userRole === 'farmer' ? (
                <Link href="/farmers/dashboard" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                  Farmer Dashboard
                </Link>
              ) : null}
            </li>
            <li>
              {isAuthenticated && userRole === 'buyer' ? (
                <Link href="/buyers/dashboard" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                  Buyer Dashboard
                </Link>
              ) : null}
            </li>
            <li>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="hover:text-secondary transition-colors duration-300 ease-in-out"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/buyers/login" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                    Buyer Login
                  </Link>
                  <Link href="/farmers/login" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                    Farmer Login
                  </Link>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
