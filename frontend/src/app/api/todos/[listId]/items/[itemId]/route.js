import dbConnect from '../../../../../utils/db';
import ToDoList from '../../../../../models/ToDoList';

export async function PATCH(req, { params }) {
  await dbConnect();

  const { listId, itemId } = params;
  console.log(`PATCH request received for listId: ${listId}, itemId: ${itemId}`);
  
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
    console.error('Error updating item:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  const { listId, itemId } = params;
  console.log(`DELETE request received for listId: ${listId}, itemId: ${itemId}`);

  try {
    const list = await ToDoList.findById(listId);
    if (!list) {
      return new Response(JSON.stringify({ success: false, error: 'List not found' }), { status: 404 });
    }
    const item = list.items.id(itemId);
    if (!item) {
      return new Response(JSON.stringify({ success: false, error: 'Item not found' }), { status: 404 });
    }
    list.items.pull(itemId);
    await list.save();
    return new Response(JSON.stringify({ success: true, message: 'Item deleted' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting item:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
