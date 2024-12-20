import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  permissions: [{
    type: String,
    required: true,
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Role', roleSchema);