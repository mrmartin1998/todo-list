// frontend/src/app/api/todos/route.js

import dbConnect from '@/app/utils/db';
import ToDoList from '@/app/models/ToDoList';
import User from '@/app/models/User';

export async function GET(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const lists = await ToDoList.find({ userId });
    return new Response(JSON.stringify({ data: lists }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching to-do lists', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  await dbConnect();
  const { name, userId } = await req.json();

  if (!name || !userId) {
    return new Response(JSON.stringify({ error: 'Name and User ID are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const user = await User.findById(userId);
    const lists = await ToDoList.find({ userId });

    if (user.subscriptionStatus === 'free' && lists.length >= 3) {
      return new Response(JSON.stringify({ error: 'Free users can only create 3 lists' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newList = await ToDoList.create({ name, userId });
    return new Response(JSON.stringify({ data: newList }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error creating to-do list', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const listId = searchParams.get('listId');

  if (!listId) {
    return new Response(JSON.stringify({ error: 'List ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await ToDoList.findByIdAndDelete(listId);
    return new Response(JSON.stringify({ message: 'To-do list deleted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting to-do list', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
