'use client';

import React, { useState } from 'react';

const Settings = () => {
  // State to manage form inputs
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: false,
    pushNotifications: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., API call to save settings
    console.log('Profile Settings:', profile);
    console.log('Notification Preferences:', notifications);
    alert('Settings updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>
        <form onSubmit={handleSubmit}>
          {/* Profile Settings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Enter your email"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleProfileChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                  placeholder="Enter a new password"
                />
              </div>
            </div>
          </div>

          {/* Notification Preferences Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="emailUpdates"
                  checked={notifications.emailUpdates}
                  onChange={handleNotificationsChange}
                  className="mr-2"
                />
                <label className="text-gray-600">Receive email updates</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="smsAlerts"
                  checked={notifications.smsAlerts}
                  onChange={handleNotificationsChange}
                  className="mr-2"
                />
                <label className="text-gray-600">Receive SMS alerts</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={notifications.pushNotifications}
                  onChange={handleNotificationsChange}
                  className="mr-2"
                />
                <label className="text-gray-600">Enable push notifications</label>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 to-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:opacity-80 transition-opacity duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
