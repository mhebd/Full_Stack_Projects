const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A animal must be a name.'],
    unique: true,
  },
  scientific_name: {
    type: String,
    required: [true, 'A animal must be a ascientific name.'],
    unique: true,
  },
  max_height: {
    type: Number,
    default: 0,
  },
  max_height_unit: {
    type: String,
  },
  min_height: {
    type: Number,
    default: 0,
  },
  min_height_unit: {
    type: String,
  },
  max_length: {
    type: Number,
    default: 0,
  },
  max_length_unit: {
    type: String,
  },
  min_length: {
    type: Number,
    default: 0,
  },
  min_length_unit: {
    type: String,
  },
  max_weight: {
    type: Number,
    default: 0,
  },
  max_weight_unit: {
    type: String,
  },
  min_weight: {
    type: Number,
    default: 0,
  },
  min_weight_unit: {
    type: String,
  },
  max_age: {
    type: Number,
    default: 01,
  },
  max_age_unit: {
    type: String,
  },
  category: {
    type: String,
    default: 'Domestic Animal',
  },
  living_area: {
    type: String,
    default: '',
  },
  cover_image: {
    type: String,
    required: [true, 'A animal must be a cover image.'],
    unique: true,
  },
  images: [String],
  details: {
    type: String,
    default: '',
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
