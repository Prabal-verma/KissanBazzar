// src/pages/api/farmers/me/route.js

import dbConnect from '../../../../utils/dbConnect';
import Farmer from '../../../../models/Farmer';
import { decodeToken } from '../../../../utils/tokenUtils'; // Ensure the path is correct

export async function GET(req) {
  await dbConnect();

  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const userEmail = decodeToken(token);

    const farmer = await Farmer.findOne({ email: userEmail });
    if (!farmer) {
      return new Response(
        JSON.stringify({ message: 'Farmer not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify(farmer),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching farmer data:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching farmer data', error: error.message }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const userEmail = decodeToken(token);
    const farmerData = await req.json(); // Assuming the request body contains JSON data

    const updatedFarmer = await Farmer.findOneAndUpdate(
      { email: userEmail },
      farmerData,
      { new: true } // Return the updated document
    );

    if (!updatedFarmer) {
      return new Response(
        JSON.stringify({ message: 'Farmer not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify(updatedFarmer),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating farmer data:', error);
    return new Response(
      JSON.stringify({ message: 'Error updating farmer data', error: error.message }),
      { status: 500 }
    );
  }
}
