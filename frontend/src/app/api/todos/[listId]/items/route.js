// frontend/src/app/api/todos/[listId]/items/route.js

import dbConnect from '../../../../utils/db';
import ToDoList from '../../../../models/ToDoList';
import User from '../../../../models/User';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  await dbConnect();

  const { listId } = params;
  const { name, userId } = await req.json();
  console.log(`POST request received for listId: ${listId}, item: ${name}`);

  try {
    const user = await User.findById(userId);
    const list = await ToDoList.findById(listId);

    if (!list) {
      return NextResponse.json({ success: false, error: 'List not found' }, { status: 404 });
    }

    if (user.subscriptionStatus === 'free' && list.items.length >= 10) {
      return NextResponse.json({ success: false, error: 'Free users can only add 10 items per list' }, { status: 403 });
    }

    const newItem = { name };
    list.items.push(newItem);
    await list.save();
    const savedItem = list.items[list.items.length - 1]; // Get the last added item
    return NextResponse.json({ success: true, data: savedItem }, { status: 201 });
  } catch (error) {
    console.error('Error adding item:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
