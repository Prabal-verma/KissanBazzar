// src/app/api/farmers/signin/route.js
import dbConnect from '../../../../utils/dbConnect';
import Farmer from '../../../../models/Farmer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Use JWT for authentication tokens

// Named export for the POST method
export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    // Find the farmer by email
    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return new Response(JSON.stringify({ message: 'Farmer not found' }), {
        status: 404,
      });
    }

    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: farmer._id, email: farmer.email },
      process.env.JWT_SECRET, // Ensure this secret key is set in your .env.local file
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    return new Response(
      JSON.stringify({ message: 'Sign-in successful', token }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error signing in', error: error.message }),
      {
        status: 500,
      }
    );
  }
}
