import dbConnect from '../../../utils/db';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();
    console.log('Received data:', { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid credentials: user not found');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Invalid credentials: password does not match');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
