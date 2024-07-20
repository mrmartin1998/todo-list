// src/app/api/auth/session/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

export async function GET(req) {
  const session = await getServerSession(authOptions);

  return new Response(JSON.stringify(session), {
    headers: { 'Content-Type': 'application/json' },
  });
}
