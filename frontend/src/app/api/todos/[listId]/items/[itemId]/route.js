import dbConnect from '../../../../../utils/db';
import ToDoList from '../../../../../models/ToDoList';

export async function DELETE(req, { params }) {
  await dbConnect();
  const { listId, itemId } = params;

  try {
    const list = await ToDoList.findById(listId);
    if (!list) {
      return new Response(JSON.stringify({ success: false, error: 'List not found' }), { status: 404 });
    }

    const itemIndex = list.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return new Response(JSON.stringify({ success: false, error: 'Item not found' }), { status: 404 });
    }

    list.items.splice(itemIndex, 1);
    await list.save();

    return new Response(JSON.stringify({ success: true, data: itemId }), { status: 200 });
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
