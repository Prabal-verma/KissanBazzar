// src/pages/api/farmers/me/route.js

import dbConnect from '@/utils/dbConnect';
import Buyer from '@/models/Buyer';
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

    const buyer = await Buyer.findOne({ email: userEmail });
    if (!buyer) {
      return new Response(
        JSON.stringify({ message: 'Buyer not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify(buyer),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching buyer data:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching buyer data', error: error.message }),
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
    const BuyerData = await req.json(); // Assuming the request body contains JSON data

    const updatedBuyer = await Buyer.findOneAndUpdate(
      { email: userEmail },
      BuyerData,
      { new: true } // Return the updated document
    );

    if (!updatedBuyer) {
      return new Response(
        JSON.stringify({ message: 'Buyer not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify(updatedBuyer),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating buyer data:', error);
    return new Response(
      JSON.stringify({ message: 'Error updating buyer data', error: error.message }),
      { status: 500 }
    );
  }
}
