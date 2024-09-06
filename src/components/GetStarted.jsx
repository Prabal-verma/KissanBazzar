// src/components/GetStarted.js
import React from 'react';

function GetStarted() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      {/* Hero Section */}
      <section className="text-center mb-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-4">Get Started with Contract Farming</h1>
        <p className="text-lg md:text-xl text-text mb-8">
          Join our platform to secure contracts, negotiate prices, and receive timely payments. Follow the steps below to get started.
        </p>
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

      {/* Benefits Section */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">Why Choose Us?</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">Secure and Reliable</h3>
            <p className="text-gray-700">Our platform ensures secure transactions and reliable contract management.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">Easy to Use</h3>
            <p className="text-gray-700">User-friendly interface designed to simplify the process of managing contracts and payments.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">24/7 Support</h3>
            <p className="text-gray-700">Get help anytime with our dedicated support team available around the clock.</p>
          </div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="w-full max-w-md mx-auto px-4">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">Create Your Account</h2>
        <form className="bg-white p-8 rounded-lg shadow-md border border-border">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="John Doe" 
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="example@domain.com" 
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="********" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="bg-primary text-white py-3 px-6 rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300 w-full"
          >
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
}

export default GetStarted;
