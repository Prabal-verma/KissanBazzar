import User from "@/models/models";
import connectDB from "@/config/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  console.log("Received registration request");

  const { username, email, password, confirmPassword } = await request.json();

  if (password !== confirmPassword) {
    console.log("Passwords do not match");
    return new NextResponse(
      JSON.stringify({ error: "Passwords do not match" }),
      { status: 400 }
    );
  }

  await connectDB();
  console.log("Connected to database");

  const existingUser = await User.findOne({ email });
  console.log("Checked for existing user");

  if (existingUser) {
    console.log("User already exists");
    return new NextResponse(
      JSON.stringify({ error: "User already exists" }),
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  console.log("Created new user instance");

  try {
    await newUser.save();
    console.log("User successfully registered");
    return new NextResponse("User is registered", { status: 201 });
  } catch (error) {
    console.error("Error saving new user:", error);
    return new NextResponse(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
};
