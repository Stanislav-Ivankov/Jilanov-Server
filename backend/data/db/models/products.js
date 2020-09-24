const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Product', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
    },
    category: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 999
    },
    subCategory: {
      type: String,
      default: ''
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
    promotion: {
      type: Boolean,
      default: false
    },
    discount: {
      type: Number,
      default: 0
    },
    newProduct: {
      type: Boolean,
      default: false
    },
    images: [{
      type: String,
      default: './assets/images/ApplicationComponent/Logo.svg'
    }],
    model: {
      en: {
        type: String,
        default: ''
      },
      bg: {
        type: String,
        default: ''
      }
    },
    subTitle: {
      en: {
        type: String,
        default: ''
      },
      bg: {
        type: String,
        default: ''
      }
    },
    price: {
      type: Number,
      default: 0
    },
    params: {
      en: [{
        key: String,
        keyInfo: String,
        value: String
      }],
      bg: [{
        key: String,
        keyInfo: String,
        value: String
      }]
    },
    specs: {
      en: [{
        key: String,
        value: String
      }],
      bg: [{
        key: String,
        value: String
      }]
    },
    url: {
      type: String,
      default: ''
    },
    extras: [{
      key: {
        en: String,
        bg: String,
      },
      values: [{
        key: {
          en: String,
          bg: String,
        },
        price: String,
        default: Boolean
      }]
    }],
    hidden: {
      type: Boolean,
      default: false
    },
    updated_at: { 
      type: Date 
    },
    created_at: { 
      type: Date 
    }
  }
);