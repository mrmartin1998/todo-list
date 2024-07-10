import dbConnect from '../../utils/db';
import ToDoList from '../../models/ToDoList';

export async function GET(req, res) {
  await dbConnect();

  try {
    const lists = await ToDoList.find({});
    return res.status(200).json({ success: true, data: lists });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
}

export async function POST(req, res) {
  await dbConnect();

  try {
    const list = await ToDoList.create(req.body);
    return res.status(201).json({ success: true, data: list });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
}
