
'use client';


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel CSS


function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track user role (farmer/buyer)
  const router = useRouter();


  useEffect(() => {
    // Function to check authentication status and user role
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role'); // Assuming role is stored in localStorage
      setIsAuthenticated(!!token);
      setUserRole(role);
    };


    // Check auth status on component mount
    checkAuthStatus();


    // Redirect if authenticated
    if (isAuthenticated && userRole) {
      if (userRole === 'farmer') {
        router.push('/farmers/profile');
      } else if (userRole === 'buyer') {
        router.push('/buyers/profile');
      }
    }
  }, [isAuthenticated, userRole, router]);


  return (
    
    <div className="min-h-screen  flex flex-col items-center py-8 px-0 bg-gradient-to-r from-blue-500 via-primary to-green-500 top-0 ">

        {/* Farmer Images Carousel */}
        <section className="w-full h-[24vh] mx-[-60px] mt-[-50px] p-0 object-cover  bg-transparent opacity-80 ">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <div>
            <img src="/kissan_background.jpg" alt="Farmer 1" />
            
          </div>
          <div>
            <img src="/kissan_image1.jpg" alt="Farmer 2" />
           
          </div>
          <div>
            <img src="/kissan_image3.jpg" alt="Farmer 3" />
            
          </div>
        </Carousel>
      </section>

      {/* Hero Section */}
      <section className="text-center mb-12 px-4 md:px-6 lg:px-8 z-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Welcome to KisanBazaar</h1>
        <p className="text-lg md:text-xl text-white mb-8">
          Connecting farmers and buyers to ensure stable market access and fair trade practices.
        </p>
        <Link href="/get-started">
          <button className="bg-primary  border-2 border-white text-white py-3 px-6 rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300">
            Get Started
          </button>
        </Link>
      </section>


      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto mb-12 px-4 z-20 ">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white opacity-85 hover:bg-white hover:opacity-100 hover:scale-105 p-6 rounded-lg shadow-md border border-border transition-all duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-primary mb-4">Secure Contracts</h3>
            <p className="text-gray-700">Ensure your agreements are safe and binding with our secure contract management system.</p>
          </div>
          <div className="bg-white opacity-85 hover:bg-white hover:opacity-100 hover:scale-105 p-6 rounded-lg shadow-md border border-border transition-all duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-primary mb-4">Price Negotiation</h3>
            <p className="text-gray-700">Negotiate prices directly through our platform for better deals and transparency.</p>
          </div>
          <div className="bg-white opacity-85 hover:bg-white hover:opacity-100 hover:scale-105 p-6 rounded-lg shadow-md border border-border transition-all duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-primary mb-4">Timely Payments</h3>
            <p className="text-gray-700">Receive payments on time with our reliable payment processing system.</p>
          </div>
        </div>
      </section>
      {/* Statistics Section */}
      <section className="bg-gray-100 w-full max-w-6xl mx-auto p-6 rounded-lg shadow-md mb-12 z-20 opacity-85">
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
      <section className="w-full max-w-4xl mx-auto mb-12 px-4 z-20">
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">What Our Users Say</h2>
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
      {/* Call to Action Section */}
      <section className="text-center px-4 mb-8 z-20">
        <h2 className="text-3xl font-semibold text-white mb-6">Ready to Get Started?</h2>
        <Link href="/get-started">
          <button className="bg-primary border-2 border-white text-white py-3 px-6 rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300">
            Join Now
          </button>
        </Link>
      </section>
    </div>
  );
}


export default Home;
