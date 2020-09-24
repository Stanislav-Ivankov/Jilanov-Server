const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.model(
  'Slide', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
    },
    webImage: {
      type: String,
      default: ''
    },
    mobileImage: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: '#'
    },
    productId: {
      type: String,
      default: '#'
    },
    index: {
      type: Number,
      default: 999
    },
    text: {
      en: {
        type: String,
        default: ''
      },
      bg: {
        type: String,
        default: ''
      }
    },
    textColor: {
      type: String,
      default: 'white'
    },
    description: {
      en: {
        type: String,
        default: ''
      },
      bg: {
        type: String,
        default: ''
      }
    },
    descriptionColor: {
      type: String,
      default: 'white'
    },
    updated_at: { 
      type: Date 
    },
    created_at: { 
      type: Date 
    }
  }
);