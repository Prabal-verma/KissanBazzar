// src/app/api/farmers/register/route.js
import dbConnect from '../../../../utils/dbConnect';
import Farmer from '@/models/Farmer'; // Ensure the path is correct based on your structure
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await dbConnect();

  try {
    const { name, email, password, contactNumber, address, farmDetails } = await req.json();

    // Check if the farmer already exists
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return new Response(JSON.stringify({ message: 'Farmer already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new farmer
    const newFarmer = new Farmer({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      address,
      farmDetails: {
        location: farmDetails?.location || '',
        size: farmDetails?.size || 0,
        cropTypes: farmDetails?.cropTypes || '',
      },
    });

    await newFarmer.save();

    return new Response(JSON.stringify({ message: 'Farmer registered successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error registering farmer', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Example for handling other HTTP methods if needed
export async function GET(req) {
  return new Response('GET method not allowed', {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
}
