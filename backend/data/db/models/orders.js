const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.model(
  'Order', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
    },
    items: [{
      id: { type: String, required: true },
      count: String,
      total: Number
    }],
    extras: [{
      id: String,
      price: String
    }],
    total: {
      type: Number,
      default: 0
    },
    name: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    message: {
      type: String
    },
    address: {
      type: String
    },
    orderId: {
      type: String
    },
    updated_at: { 
      type: Date 
    },
    created_at: { 
      type: Date 
    }
  }
);