// src/app/farmers/signin/page.jsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext'; // Import useAuth

const SignInPage = () => {
  const { login } = useAuth(); // Get the login function from the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/farmers/signin', {
        email,
        password,
      });

      // Use the context's login function to set the token and update state
      login(response.data.token);
      localStorage.setItem('userType', 'farmer'); // Set user type to 'farmer'


      // Redirect to the dashboard
      router.push('/farmers/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Error signing in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
        <h2 className="text-2xl mb-6 font-semibold text-center text-green-700">
          Farmer Sign-In
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">New farmer? Create an account:</p>
          <button
            onClick={() => router.push('/farmers/register')}
            className="mt-3 w-full p-2 border border-green-600 text-green-700 rounded hover:bg-green-50 transition"
          >
            Register as Farmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
