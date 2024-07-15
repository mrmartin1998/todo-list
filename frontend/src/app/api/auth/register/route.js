import { NextResponse } from 'next/server';
import dbConnect from '@/app/utils/db';
import User from '@/app/models/User';
import transporter from '@/app/utils/nodemailer';

export async function POST(req) {
  await dbConnect();
  console.log('Database connected');
  
  try {
    const body = await req.json();
    console.log('Request body:', body);
    const { email } = body;

    if (!email) {
      console.log('No email provided');
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    console.log('Existing user:', existingUser);

    if (existingUser) {
      console.log('Email already in use');
      return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
    }

    const newUser = new User({ email });
    await newUser.save();
    console.log('New user saved:', newUser);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify your email',
      text: 'Please click the link to verify your email address.',
      html: '<p>Please click the link to verify your email address.</p>',
    };

    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');

    return NextResponse.json({ message: 'Verification email sent' }, { status: 200 });
  } catch (error) {
    console.error('Internal server error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
