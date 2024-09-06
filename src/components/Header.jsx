// src/components/Header.js
import Link from 'next/link';
import React from 'react';

function Header() {
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
              <Link href="/farmer-profile" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Farmer Profile
              </Link>
            </li>
            <li>
              <Link href="/buyer-profile" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Buyer Profile
              </Link>
            </li>
            <li>
              <Link href="/contracts" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Contracts
              </Link>
            </li>
            <li>
              <Link href="/messages" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Messages
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
