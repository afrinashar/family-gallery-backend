/* eslint-disable no-undef */
// models/Image.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,  // Category is now a string with only one value
    required: true,
    enum: ['fero', 'leo', 'pio', 'rabi'], // Optional: restrict to these categories
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

imageSchema.plugin(mongoosePaginate);

const Image = mongoose.model('photos', imageSchema);

module.exports = Image;
