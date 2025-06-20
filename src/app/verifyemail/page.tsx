"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (err) {
      setError(true);
      console.log(err.response?.data || err);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
      {verified && (
        <div className="text-green-600">
          Email Verified Successfully!{" "}
          <Link href="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      )}
      {error && (
        <div className="text-red-600">
          Verification Failed. Token may be invalid or expired.
        </div>
      )}
      {!verified && !error && <p className="text-gray-600">Verifying...</p>}
    </div>
  );
}
