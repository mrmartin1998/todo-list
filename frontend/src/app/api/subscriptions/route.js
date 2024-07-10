import dbConnect from '../../../utils/db';
import Subscription from '../../../models/Subscription';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const subscriptions = await Subscription.find({});
        res.status(200).json({ success: true, data: subscriptions });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const subscription = await Subscription.create(req.body);
        res.status(201).json({ success: true, data: subscription });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
