import { NextResponse } from 'next/server';
import dbConnect from '../../utils/db';
import ToDoList from '../../models/ToDoList';

export async function GET() {
  await dbConnect();

  try {
    const lists = await ToDoList.find({});
    return NextResponse.json({ success: true, data: lists }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const list = await ToDoList.create(body);
    return NextResponse.json({ success: true, data: list }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
