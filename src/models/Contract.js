import mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  buyerId: {
    type: String,
    
    
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
});

export default mongoose.models.Contract || mongoose.model('Contract', ContractSchema);
