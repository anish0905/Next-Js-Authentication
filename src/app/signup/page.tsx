"use client";

import Link from 'next/link';
import { useRouter } from "next/navigation";
import axios from 'axios';
import React, { useEffect } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled , setButtonDisabled] = React.useState(false);
  const [loading , setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post('/api/users/signup', user); // Change to your API endpoint
      console.log("Signup successful", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. Please try again.");
    }
  };
  useEffect(()=>{
    if(user.email.length> 0 && user.password.length> 0 && user.username.length>0 ){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }

  },[user])

  return (
    <div className='flex   bg-gray-900 flex-col items-center justify-center min-h-screen py-2'>
      <h1 className="text-3xl font-bold text-white mb-6">{loading?"Processing" :"Signup" }</h1>
      <hr className="w-1/4 mb-4"/>
      <form action=""  onSubmit={onSignup}
        className="bg-white rounded-lg p-8 shadow-md w-full max-w-sm">
      <label htmlFor="username" className="mb-1 text-gray-700">Username</label>
      <input
        type="text"
        id="username"
        className='p-2 border  border-gray-300 rounded-lg mb-4 w-72 focus:outline-none focus:border-gray-600'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='Enter your username'
      />

      <label htmlFor="email" className="mb-1 text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        className='p-2 border border-gray-300 rounded-lg mb-4 w-72 focus:outline-none focus:border-gray-600'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Enter your email'
      />

      <label htmlFor="password" className="mb-1 text-gray-700">Password</label>
      <input
        type="password"
        id="password"
        className=' text-black p-2 border border-gray-300 rounded-lg mb-4 w-72 focus:outline-none focus:border-gray-600'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Enter your password'
      />

      <button
        onClick={onSignup}
        className='p-2 w-72 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4'
      >
     {buttonDisabled ?    "No Signup" :" Signup"}
      </button>

      <Link href="/login" className="text-blue-600 hover:underline">
        Already have an account? Login
      </Link>
      </form>
    </div>
  );
}
