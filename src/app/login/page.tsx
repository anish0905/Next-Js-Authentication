"use client"
import React, { useEffect } from 'react';
import  axios  from "axios";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
 // <--- This is missing in your current code



export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading , setLoading] = React.useState(false)
  const [buttonDisabled , setButtonDisabled] = React.useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
    setLoading(true)
      
    const response = await axios.post("/api/users/login" , user);
    console.log("Login success", response.data);  
   toast.success("Login sucess")
    user.email="";
      user.password="";
  router.push("/profile")
    
   } catch (error) {
      setLoading(false)
      user.email="";
      user.password="";
    console.log("Login failed" , error);
    alert("Login failed . Please try again" )
    
    
   }
    // Add login logic here
  };

  useEffect(()=>{
    if(user.email.length> 0 && user.password.length>0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }

  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">{loading? "processing" : "Login"}</h1>
       <hr className="w-1/4 mb-4" />    
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
         {buttonDisabled ? "No login" : " Login"}
        </button>
          <Link href="/signup" className="text-blue-600 hover:underline">
       Create new  account? Signup
      </Link>
      </form>
    </div>
  );
}
