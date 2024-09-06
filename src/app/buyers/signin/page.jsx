// src/app/buyers/signin/page.jsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignInBuyer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/buyers/signin', {
        email,
        password,
      });

      // Store the token (e.g., in local storage)
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard or any other page
      router.push('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Error signing in');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-md w-80"
      >
        <h2 className="text-xl mb-4 font-semibold text-gray-900 text-center">
          Buyer Sign-In
        </h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInBuyer;
