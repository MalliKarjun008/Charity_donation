const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  charity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charity',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'ETH'
  },
  transactionHash: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'flagged'],
    default: 'pending'
  },
  fraudScore: {
    type: Number,
    min: 0,
    max: 1
  },
  isFraud: {
    type: Boolean,
    default: false
  },
  blockNumber: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},{ collection: 'donations' });

module.exports = mongoose.model('Donation', donationSchema);