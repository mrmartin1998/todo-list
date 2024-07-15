"use client";

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/verify-user', { email });
      if (response.data.userExists) {
        setMessage('User exists. Redirecting...');
        setTimeout(() => {
          router.push('/'); // Redirect to home or desired page after sign-in
        }, 2000);
      } else {
        setMessage('User does not exist. Please register.');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Sign In</h1>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300 text-black bg-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          Don't have an account?{' '}
          <Link href="register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
