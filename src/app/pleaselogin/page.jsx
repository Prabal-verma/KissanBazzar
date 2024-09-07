import React from 'react';

const Page = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gradient-to-br from-white to-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to Our Platform
        </h2>
        <p className="text-gray-600 mb-6">
          Please login to continue using the application.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all duration-300 ease-in-out">
          Login
        </button>
      </div>
    </div>
  );
}

export default Page;
