// frontend/src/app/api/users/[email]/route.js

import dbConnect from '@/app/utils/db';
import User from '@/app/models/User';

export async function GET(req, { params }) {
  await dbConnect();

  const { email } = params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
