// src/app/api/buyers/register/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Buyer from '@/models/Buyer';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, password, contactNumber, address } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check if the email already exists
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new buyer
    const newBuyer = new Buyer({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      address,
    });

    await newBuyer.save();

    return NextResponse.json({ message: 'Buyer registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
