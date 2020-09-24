const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.model(
  'Message', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
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
    updated_at: { 
      type: Date 
    },
    created_at: { 
      type: Date 
    }
  }
);