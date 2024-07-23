// frontend/src/app/pages/success/page.js

'use client';

import React from 'react';
import Link from 'next/link';

const SuccessPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
      <h1 className="text-2xl font-bold mb-6 text-black">Payment Successful!</h1>
      <p className="mb-6 text-black">Thank you for your purchase.</p>
      <Link href="/" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 block text-center">
        Go to Home
      </Link>
    </div>
  </div>
);

export default SuccessPage;
