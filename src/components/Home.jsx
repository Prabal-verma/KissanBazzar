'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel CSS

const NEWS_API_KEY = 'bbdfdd5ccd9448899bc9bb400f7075af'; // Your API key
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`;

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Track user role (farmer/buyer)
  const [news, setNews] = useState([]);
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

  useEffect(() => {
    // Fetch news articles from the API
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();
        if (data.status === 'ok') {
          setNews(data.articles);
        } else {
          console.error('Failed to fetch news:', data.message);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 bg-gray-200">
      {/* Hero Section with Carousel and News Sections */}
      <section className="relative w-full max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left News Section */}
        <div className="hidden md:w-1/4 md:block bg-gradient-to-b from-blue-50 to-blue-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest News</h2>
          <div className="space-y-4">
            {news.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Image
                  src={news[0].urlToImage || '/default-image.jpg'} // Fallback image in case of missing URL
                  alt={news[0].title}
                  width={400}
                  height={200}
                  className="object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{news[0].title}</h3>
                <p className="text-gray-700 mb-2">{news[0].description}</p>
                <a href={news[0].url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Read more
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Carousel */}
        <div className="w-full md:w-1/2 relative bg-gray-300 rounded-lg overflow-hidden">
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            <div>
              <Image
                src="/kissan_background.jpg"
                alt="Farmer 1"
                layout="responsive"
                width={800}
                height={450}
                className="object-cover"
              />
            </div>
            <div>
              <Image
                src="/kissan_image1.jpg"
                alt="Farmer 2"
                layout="responsive"
                width={800}
                height={450}
                className="object-cover"
              />
            </div>
            <div>
              <Image
                src="/kissan_image3.jpg"
                alt="Farmer 3"
                layout="responsive"
                width={800}
                height={450}
                className="object-cover"
              />
            </div>
          </Carousel>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4 py-8 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent rounded-lg">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Welcome to KissanBazaar</h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Connecting farmers and buyers to ensure stable market access and fair trade practices.
            </p>
            {!isAuthenticated && (
              <Link href="/get-started">
                <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Right News Section */}
        <div className=" md:w-1/4 md:block bg-gradient-to-b from-purple-50 to-purple-100 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">More News</h2>
          <div className="space-y-4">
            {news.length > 1 && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Image
                  src={news[1].urlToImage || '/default-image.jpg'} // Fallback image in case of missing URL
                  alt={news[1].title}
                  width={400}
                  height={200}
                  className="object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{news[1].title}</h3>
                <p className="text-gray-700 mb-2">{news[1].description}</p>
                <a href={news[1].url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Read more
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-lg my-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Platform Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-2xl font-bold text-teal-500 mb-2">500+</h3>
            <p className="text-gray-700">Farmers Connected</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-500 mb-2">1000+</h3>
            <p className="text-gray-700">Successful Contracts</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-teal-500 mb-2">95%</h3>
            <p className="text-gray-700">User Satisfaction</p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-screen-xl mx-auto bg-gray-200 p-6 rounded-lg shadow-lg my-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">What Our Users Say</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Secure and Reliable</h3>
            <p className="text-gray-700">
              Our platform ensures secure transactions and reliable contract management.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Easy to Use</h3>
            <p className="text-gray-700">
              User-friendly interface designed to simplify the process of managing contracts and payments.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">24/7 Support</h3>
            <p className="text-gray-700">
              Get help anytime with our dedicated support team available around the clock.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
