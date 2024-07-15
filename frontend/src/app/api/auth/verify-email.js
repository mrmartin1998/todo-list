import { MongoClient } from 'mongodb';

async function verifyEmail(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db();
  const collection = db.collection('users');

  const user = await collection.findOne({ email });

  if (!user) {
    client.close();
    return res.status(400).json({ error: 'Invalid email' });
  }

  await collection.updateOne({ email }, { $set: { verified: true } });
  client.close();

  res.status(200).json({ message: 'Email verified successfully' });
}

export default verifyEmail;
