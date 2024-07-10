import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  service: { type: String, required: true },
  amount: { type: Number, required: true },
  renewalDate: { type: Date, required: true },
});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);
