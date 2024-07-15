import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/db';
import User from '@/app/models/User';

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User exists', userExists: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User does not exist', userExists: false }, { status: 200 });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
