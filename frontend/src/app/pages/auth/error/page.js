"use client";

import React from 'react';
import Link from 'next/link';

const ErrorPage = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Error</h1>
        <p className="text-center text-red-500">{error || 'An error occurred. Please try again.'}</p>
        <p className="mt-4 text-center text-black">
          Go back to{' '}
          <Link href="/auth/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
