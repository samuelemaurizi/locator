const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const LocationSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: [true, 'Add Location ID'],
    unique: true,
    trim: true,
    maxlength: [10, 'Location ID must be less then 10 chars']
  },
  address: {
    type: String,
    required: [true, 'Add an addres']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocoder Middleware
LocationSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.address);
  // console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address in db
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Location', LocationSchema);
