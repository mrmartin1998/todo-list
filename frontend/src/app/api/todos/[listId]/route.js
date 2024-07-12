import dbConnect from '../../../utils/db';
import ToDoList from '../../../models/ToDoList';

export async function GET(req, { params }) {
  await dbConnect();

  const { listId } = params;

  try {
    const list = await ToDoList.findById(listId);
    if (!list) {
      return new Response(JSON.stringify({ success: false, error: 'List not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: list }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function POST(req, { params }) {
  await dbConnect();

  const { listId } = params;
  const { name } = await req.json();

  try {
    const list = await ToDoList.findById(listId);
    if (!list) {
      return new Response(JSON.stringify({ success: false, error: 'List not found' }), { status: 404 });
    }
    const newItem = { name };
    list.items.push(newItem);
    await list.save();
    return new Response(JSON.stringify({ success: true, data: newItem }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  await dbConnect();

  const { listId, itemId } = params;
  const { completed } = await req.json();

  try {
    const list = await ToDoList.findById(listId);
    if (!list) {
      return new Response(JSON.stringify({ success: false, error: 'List not found' }), { status: 404 });
    }
    const item = list.items.id(itemId);
    if (!item) {
      return new Response(JSON.stringify({ success: false, error: 'Item not found' }), { status: 404 });
    }
    item.completed = completed;
    await list.save();
    return new Response(JSON.stringify({ success: true, data: item }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  const { listId } = params;

  try {
    const list = await ToDoList.findByIdAndDelete(listId);
    if (!list) {
      return new Response(JSON.stringify({ success: false, error: 'List not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, message: 'List deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
