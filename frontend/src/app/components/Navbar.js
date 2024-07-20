'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">To-Do App</div>
        <ul className="flex space-x-4">
          <li><a href="/" className="text-white hover:text-gray-300">Home</a></li>
          <li><a href="/subscriptions" className="text-white hover:text-gray-300">Subscriptions</a></li>
          <li><a href="/profile" className="text-white hover:text-gray-300">Profile</a></li>
          {session ? (
            <>
              <li className="text-white">{session.user.email}</li>
              <li>
                <button onClick={() => signOut()} className="text-white bg-red-500 px-4 py-2 rounded">
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => signIn()} className="text-white bg-green-500 px-4 py-2 rounded">
                Sign in
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
