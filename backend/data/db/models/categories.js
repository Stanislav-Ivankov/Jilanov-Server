const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.model(
  'Category', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
    },
    title: {
      en: {
        type: String,
        default: ''
      },
      bg: {
        type: String,
        default: ''
      }
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
    content: {
      en: {
        type: String,
        default: ''
      },
      bg: {
        type: String,
        default: ''
      }
    },
    route: {
      type: String,
      default: '#'
    },
    class: {
      type: String,
      default: '#'
    },
    products: {
      type: String,
      default: 'Category'
    },
    shownOnNav: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 999
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