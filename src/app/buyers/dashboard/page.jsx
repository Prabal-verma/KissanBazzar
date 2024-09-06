import React from 'react';

const BuyerDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Buyer Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, Buyer!</h2>
        <p className="mb-4">Here you can manage your buyer profile, view contracts, and more.</p>
        <ul className="space-y-4">
          <li>
            <a href="/buyers/profile" className="text-blue-500 hover:underline">View Profile</a>
          </li>
          <li>
            <a href="/contracts" className="text-blue-500 hover:underline">View Contracts</a>
          </li>
          <li>
            <a href="/messages" className="text-blue-500 hover:underline">Messages</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BuyerDashboard;
