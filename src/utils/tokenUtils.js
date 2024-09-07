import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Ensure this matches your actual secret key

export const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.email; // Adjust based on your token payload
  } catch (error) {
    throw new Error('Invalid token');
  }
};
