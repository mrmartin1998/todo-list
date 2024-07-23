// frontend/src/app/pages/profile/page.js

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session) {
        const response = await fetch(`/api/users/${session.user.email}`);
        const data = await response.json();
        setUser(data.user);
      }
    };

    fetchUserData();
  }, [session]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-black">Profile</h1>
        <p className="mb-4 text-black">Email: {user.email}</p>
        <p className="mb-4 text-black">Subscription: {user.subscriptionStatus}</p>
        {user.subscriptionStatus === 'free' && (
          <Link href="/pages/stripe/subscribe" className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 block text-center">
            Upgrade to Premium
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
