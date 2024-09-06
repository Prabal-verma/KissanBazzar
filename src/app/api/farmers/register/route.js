// src/app/api/farmers/register/route.js
import dbConnect from '../../../../utils/dbConnect';
import Farmer from '../../../../models/Farmer'; // Ensure the path is correct based on your structure
import bcrypt from 'bcrypt';

// Named export for the POST method
export async function POST(req, res) {
  await dbConnect();

  try {
    const { name, email, password, contactNumber, address, farmDetails } = await req.json();

    // Check if the farmer already exists
    const existingFarmer = await Farmer.findOne({ email });
    if (existingFarmer) {
      return new Response(JSON.stringify({ message: 'Farmer already exists' }), {
        status: 400,
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
      farmDetails,
    });

    await newFarmer.save();

    return new Response(JSON.stringify({ message: 'Farmer registered successfully' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error registering farmer', error: error.message }), {
      status: 500,
    });
  }
}

// Example for handling other HTTP methods if needed
export async function GET(req, res) {
  // Handle GET requests here
  return new Response('GET method not allowed', { status: 405 });
}
