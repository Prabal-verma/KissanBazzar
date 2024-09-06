// src/components/Button.js
import React from 'react';

function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-secondary transition ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
