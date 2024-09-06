// pages/register.js
'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
    farmDetails: {
      location: '',
      size: '',
      cropTypes: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested object change
    if (name.includes('farmDetails.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        farmDetails: { ...prev.farmDetails, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/farmers/register', formData);
      alert('Farmer registered successfully');
      // Optionally clear form or redirect
      setFormData({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        address: '',
        farmDetails: {
          location: '',
          size: '',
          cropTypes: '',
        },
      });
    } catch (error) {
      console.error('Error registering farmer:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-900">Register as a Farmer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900"
          />
          <input
            type="text"
            name="farmDetails.location"
            placeholder="Farm Location"
            value={formData.farmDetails.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900"
          />
          <input
            type="number"
            name="farmDetails.size"
            placeholder="Farm Size (in acres)"
            value={formData.farmDetails.size}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900"
          />
          <input
            type="text"
            name="farmDetails.cropTypes"
            placeholder="Crop Types (e.g., Wheat, Rice)"
            value={formData.farmDetails.cropTypes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
