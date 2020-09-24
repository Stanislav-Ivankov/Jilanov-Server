const mongoose = require('mongoose');
const uuid = require('uuid');

module.exports = mongoose.model(
  'User', 
  {
    _id: { 
      type: mongoose.Types.ObjectId, 
      auto: true
    },
    username: {
      type: String,
      default: '#',
      required: true
    },
    password: {
      type: String,
      default: '#',
      required: true
    },
    profilePicture: {
      type: String,
      default: './assets/images/ApplicationComponent/Logo.svg'
    },
    name: {
      type: String,
      default: '#'
    },
    email: {
      type: String,
      default: '#'
    },
    phone: {
      type: Number,
      default: 999,
      required: true
    },
    address: {
      type: String,
      default: 'TODO'
    },
    companyName: {
      type: String,
      default: 'white'
    },
    companyEik: {
      type: String,
      default: 'white'
    },
    companyMol: {
      type: String,
      default: 'white'
    },
    companyAddressCity: {
      type: String,
      default: 'white'
    },
    companyAddressInCity: {
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