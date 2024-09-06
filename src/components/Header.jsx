"use client"
// src/components/Header.js
import Link from 'next/link';
import React from 'react';
import { signOut, useSession } from "next-auth/react"
import { Button } from "@material-tailwind/react"

function Header() {
  const {data:session }=useSession()
  return (
    <header className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6 lg:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Contract Farming Platform</h1>
        <nav>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link href="/" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Home
              </Link>
            </li>
            <li>
              <Link href="/farmer-profile" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Farmer Profile
              </Link>
            </li>
            <li>
              <Link href="/buyer-profile" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Buyer Profile
              </Link>
            </li>
            <li>
              <Link href="/contracts" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Contracts
              </Link>
            </li>
            <li>
              <Link href="/messages" className="hover:text-secondary transition-colors duration-300 ease-in-out">
                Messages
              </Link>
            </li>
          </ul>
          {!session?( <>
          <div className=' gap-5'>
            <h4>Buyer</h4>
          <li className="mx-4 mt-5">
                        <Link href="/loginBuyer" className="text-white font-bold sx:rounded-lg sx:bg-gray-800 p-2 active:bg-gray-900">
                        Login</Link>
                    </li>

                    <li className="mx-4 mb-[2rem] sx:mt-5">
                        <Link href="/RegisterBuyer" className="text-white font-bold sx:rounded-lg sx:bg-gray-800 p-2 active:bg-gray-900">
                        Register</Link>
                    </li>

          </div>
          <div className='flex-col'>
          <h4>Farmer </h4>
          <li className="mx-4 mt-5">
            
                        <Link href="/loginFarmer" className="text-white font-bold sx:rounded-lg sx:bg-gray-800 p-2 active:bg-gray-900">
                        Login</Link>
                    </li>

                    <li className="mx-4 mb-[2rem] sx:mt-5">
                        <Link href="/RegisterFarmer" className="text-white font-bold sx:rounded-lg sx:bg-gray-800 p-2 active:bg-gray-900">
                        Register</Link>
                    </li>
          </div>
          
                    </>):( 
                        <div className="flex-col ">
                       <p className="mb-4 text-white">{session.user?.email}</p>
                       <li>
                       <Button className="bg-red-900 p-2 px-5 mb-[2rem]" onClick={()=>signOut()} >Log Out</Button>
                       </li>
                    </div>)}
        </nav>
      </div>
    </header>
  );
}

export default Header;
