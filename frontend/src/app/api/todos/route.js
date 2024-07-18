import dbConnect from '../../utils/db';
import ToDoList from '../../models/ToDoList';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
  }

  try {
    const lists = await ToDoList.find({ user: userId });
    return NextResponse.json({ success: true, data: lists }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const { name, userId } = await req.json();

    if (!name || !userId) {
      return NextResponse.json({ success: false, message: 'Name and User ID are required' }, { status: 400 });
    }

    const list = new ToDoList({ name, user: userId });
    await list.save();
    return NextResponse.json({ success: true, data: list }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
