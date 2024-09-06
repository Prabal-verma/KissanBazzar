// src/models/Buyer.js
import mongoose from 'mongoose';

const BuyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String },
  address: { type: String },
});

export default mongoose.models.Buyer || mongoose.model('Buyer', BuyerSchema);
