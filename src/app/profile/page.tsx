"use client";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const [data, setData] = useState("");
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Logout successful:", response.data);

      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout error:", error.message);
      toast.error("Logout failed: " + error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setData(response.data.data._id);
    } catch (error) {
      console.log("Error fetching user details:", error);
      toast.error("Failed to load user details");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Profile</h1>

        <h2 className="mb-4">
          {data ? (
            <Link href={`/profile/${data}`} className="text-blue-500 underline">
              View Profile: {data}
            </Link>
          ) : (
            <span className="text-gray-500">No user loaded</span>
          )}
        </h2>

        <hr className="mb-4" />
        <p className="text-gray-600 mb-6">Welcome to your profile page.</p>
        <hr className="mb-6" />

        <button
          onClick={getUserDetails}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 mr-2"
        >
          Get User Details
        </button>

        <button
          onClick={logout}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
