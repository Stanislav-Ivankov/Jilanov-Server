const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.model(
  'SubCategory', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
    },
    label: {
      en: {
        type: String,
        default: ''
      },
      bg: {
        type: String,
        default: ''
      }
    },
    category: {
      type: String,
      default: './assets/images/ApplicationComponent/Logo.svg'
    },
    url: {
      type: String,
      default: 'unknown'
    },
    index: {
      type: Number,
      default: 999
    },
    updated_at: { 
      type: Date 
    },
    created_at: { 
      type: Date 
    }
  }
);