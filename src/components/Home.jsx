// src/pages/index.js
import React from 'react';
import Link from 'next/link';

function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      {/* Hero Section */}
      <section className="text-center mb-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-4">Welcome to KisanBazaar</h1>
        <p className="text-lg md:text-xl text-text mb-8">
          Connecting farmers and buyers to ensure stable market access and fair trade practices.
        </p>
        <Link href="/get-started">
          <button className="bg-primary text-white py-3 px-6 rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">Secure Contracts</h3>
            <p className="text-gray-700">Ensure your agreements are safe and binding with our secure contract management system.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">Price Negotiation</h3>
            <p className="text-gray-700">Negotiate prices directly through our platform for better deals and transparency.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <h3 className="text-xl font-semibold text-primary mb-4">Timely Payments</h3>
            <p className="text-gray-700">Receive payments on time with our reliable payment processing system.</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-100 w-full max-w-6xl mx-auto p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">Platform Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">500+</h3>
            <p className="text-gray-700">Farmers Connected</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">1000+</h3>
            <p className="text-gray-700">Successful Contracts</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">95%</h3>
            <p className="text-gray-700">User Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl font-semibold text-text mb-6 text-center">What Our Users Say</h2>
        <div className="space-y-6">
          <blockquote className="bg-white p-6 rounded-lg shadow-md border border-border">
            <p className="text-gray-700 italic">“This platform has revolutionized the way we handle contracts and payments. It's secure and easy to use!”</p>
            <footer className="mt-4 text-right text-gray-500">— Alex, Farmer</footer>
          </blockquote>
          <blockquote className="bg-white p-6 rounded-lg shadow-md border border-border">
            <p className="text-gray-700 italic">“A fantastic tool for managing agricultural contracts. Highly recommend to both farmers and buyers.”</p>
            <footer className="mt-4 text-right text-gray-500">— Jamie, Buyer</footer>
          </blockquote>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center px-4 mb-8">
        <h2 className="text-3xl font-semibold text-text mb-6">Ready to Get Started?</h2>
        <Link href="/get-started">
          <button className="bg-primary text-white py-3 px-6 rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300">
            Join Now
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
