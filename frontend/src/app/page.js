// frontend/src/app/page.js
'use client';

import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-6 text-black">Welcome to the To-Do List Web App</h1>
          <p className="mb-6 text-black">
            This web application allows you to create and manage your to-do lists effortlessly. Sign in to access your lists, or register if you don&apos;t have an account.
          </p>
          <div className="mb-4">
            <Link href="pages/auth/signin" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 block mb-4 text-center">
              Sign In
            </Link>
            <Link href="pages/auth/register" className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 block text-center">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
