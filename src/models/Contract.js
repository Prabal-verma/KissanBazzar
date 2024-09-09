import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer',
    required: true,
  },
  cropType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});

export default mongoose.models.Contract || mongoose.model('Contract', ContractSchema);
