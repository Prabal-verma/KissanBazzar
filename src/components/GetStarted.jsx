'use client';


import React, { useEffect, useState } from 'react';
import Link from 'next/link';


function GetStarted() {
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
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      {/* Hero Section */}
      <section className="text-center mb-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-4">Sign Up to get started</h1>
        <p className="text-lg md:text-xl text-text mb-8">
          Choose your role to get started. Are you a farmer or a buyer?
        </p>
      </section>


      {/* Role Selection */}
      <section className="w-full max-w-5xl mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Farmer Card */}
          <Link href="/farmers/signin">
            <div
              className="bg-white p-6 rounded-lg shadow-md border border-border cursor-pointer hover:bg-gray-100 transition-colors duration-300 flex-1"
            >
              <h2 className="text-2xl font-semibold text-primary mb-4">I am a Farmer</h2>
              <p className="text-gray-700">
                Join us as a farmer to manage your crops, secure contracts, and connect with buyers.
              </p>
            </div>
          </Link>


          {/* Buyer Card */}
          <Link href="/buyers/signin">
            <div
              className="bg-white p-6 rounded-lg shadow-md border border-border cursor-pointer hover:bg-gray-100 transition-colors duration-300 flex-1"
            >
              <h2 className="text-2xl font-semibold text-primary mb-4">I am a Buyer</h2>
              <p className="text-gray-700">
                Join us as a buyer to browse available produce, negotiate prices, and manage orders.
              </p>
            </div>
          </Link>
        </div>
      </section>


      {/* Steps Section */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">Sign Up</h3>
            <p className="text-gray-700">Create your account by providing basic information and setting up your profile.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">Set Up Your Profile</h3>
            <p className="text-gray-700">Complete your profile with relevant details to start connecting with farmers or buyers.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">Start Contracting</h3>
            <p className="text-gray-700">Begin managing contracts, negotiating prices, and processing payments directly through the platform.</p>
          </div>
        </div>
      </section>
    </div>
  );
}


export default GetStarted;
