// src/models/Farmer.js
import mongoose from 'mongoose';

const FarmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  farmDetails: {
    location: {
      type: String,
    },
    size: {
      type: Number,
    },
    cropTypes: {
      type: String,
    },
  },
});

// Check if the Farmer model already exists to prevent overwriting
const Farmer = mongoose.models.Farmer || mongoose.model('Farmer', FarmerSchema);

export default Farmer;
