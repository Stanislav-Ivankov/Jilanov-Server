const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.model(
  'FooterLink', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: './assets/images/ApplicationComponent/Logo.svg'
    },
    updated_at: { 
      type: Date 
    },
    created_at: { 
      type: Date 
    }
  }
);