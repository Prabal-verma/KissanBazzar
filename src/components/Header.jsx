// src/components/Header.jsx
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FiMenu,
  FiX,
  FiSettings,
  FiLogOut,
  FiHome,
  FiUser,
  FiFileText,
  FiShoppingCart,
} from 'react-icons/fi'; // Added more icons

function Header() {
  const { isAuthenticated, userType, logout } = useAuth();
  const [currentUserType, setCurrentUserType] = useState(userType);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              className="flex items-center hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FiHome className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/farmers/profile"
              className="flex items-center hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FiUser className="mr-2" /> Farmer Profile
            </Link>
          </li>
          <li>
            <Link
              href="/farmers/myContracts"
              className="flex items-center hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FiFileText className="mr-2" /> My Contracts
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
              className="flex items-center hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FiHome className="mr-2" /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/buyers/profile"
              className="flex items-center hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FiUser className="mr-2" /> Buyer Profile
            </Link>
          </li>
          <li>
            <Link
              href="/buyers/markets"
              className="flex items-center hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <FiShoppingCart className="mr-2" /> Market
            </Link>
          </li>
        </>
      );
    }
    return null;
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 via-primary to-green-500 text-white shadow-lg sticky top-0 bg-opacity-80 backdrop-blur-md transition-all duration-300 z-50 lg:h-[85px] sm:h-[60px] ">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6 lg:p-8">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl sm: text-[25px] font-sans font-extrabold tracking-tight transform hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer">
            KissanBazzar
          </h1>
        </Link>
        {/* Menu Icon for mobile */}
        <button
          className="md:hidden text-white focus:outline-none "
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "" : <FiMenu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 text-lg font-medium">
            {isAuthenticated ? (
              <>
                {renderUserLinks()}
                <li>
                  <Link
                    href="/settings"
                    className="flex items-center hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out gap-2"
                  >
                   <FiSettings className="inline-block ml-1" /> Settings 
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center hover:text-yellow-300 hover:scale-105 transition-all duration-300 ease-in-out gap-2"
                  >
                   <FiLogOut className="inline-block ml-1" /> Logout 
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

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 w-64 bg-gradient-to-r from-blue-500 to-green-500 text-white min-h-full transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full hidden '
          } transition-transform duration-500 ease-in-out`}
        >
          <div className="p-6">
            <button
              className="text-white focus:outline-none "
              onClick={() => setIsMenuOpen(false)}
            >
              <FiX size={28} />
            </button>
            <ul className="mt-8 space-y-6 text-lg font-medium">
              {isAuthenticated ? (
                <>
                  {renderUserLinks()}
                  <li>
                    <Link
                      href="/settings"
                      className="flex items-center hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiSettings className="inline-block ml-1" /> Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center hover:text-yellow-300 hover:scale-105 transition-all duration-300 ease-in-out gap-2"
                    >
                     <FiLogOut className="inline-block ml-1" /> Logout 
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/farmers/signin"
                      className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Farmer Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/buyers/signin"
                      className="hover:text-yellow-300 hover:underline hover:scale-105 transition-all duration-300 ease-in-out"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Buyer Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;