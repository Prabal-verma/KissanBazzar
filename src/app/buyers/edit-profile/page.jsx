// src/app/edit-profile/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/buyers/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name || '',
            email: data.email || '',
            contactNumber: data.contactNumber || '',
            address: data.address || '',
          });
        } else {
          throw new Error('Failed to fetch buyer data');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/buyers/me', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/buyers/profile');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 px-4">
      <section className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow-md border border-border">
          <h1 className="text-3xl font-semibold text-text mb-4">Edit Profile</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium text-text mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-text mb-2">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-text mb-2">Contact</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium text-text mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-lg shadow-lg hover:bg-secondary transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
