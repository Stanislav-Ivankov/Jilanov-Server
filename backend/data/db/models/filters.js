const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.model(
  'Filter', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
    },
    categoryList: [String],
    title: {
      en: {
        type: String,
        default: 'Title'
      },
      bg: {
        type: String,
        default: 'Title'
      }
    },
    optionsList: [{
        id: { 
          type: String, 
          default: uuid.v4,
          index: { unique: true }
        },
        text: String,
        onlyOne: Boolean
    }],
    updated_at: { 
      type: Date 
    },
    created_at: { 
      type: Date 
    }
  }
);