import dbConnect from '../../../../utils/db';
import ToDoList from '../../../../models/ToDoList';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  await dbConnect();

  const { listId } = params;
  const { name } = await req.json();
  console.log(`POST request received for listId: ${listId}, item: ${name}`);

  try {
    const list = await ToDoList.findById(listId);
    if (!list) {
      return NextResponse.json({ success: false, error: 'List not found' }, { status: 404 });
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
