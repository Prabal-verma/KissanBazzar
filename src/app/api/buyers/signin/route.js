// src/app/api/buyers/signin/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Buyer from '@/models/Buyer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Find the buyer by email
    const buyer = await Buyer.findOne({ email });
    if (!buyer) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Create a JWT token
    const token = jwt.sign({ id: buyer._id, email: buyer.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
