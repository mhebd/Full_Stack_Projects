const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Portfolio contains must be a name.'],
    minLength: 4,
    unique: true,
  },
  url: {
    type: String,
    required: [true, 'A Portfolio contains must be a URL,'],
    unique: true,
    minLength: 7,
  },
  cover_image: {
    type: String,
    required: [true, 'A Portfolio contains must be a cover image'],
    unique: true,
    minLength: 5,
  },
  images: [String],
  details: {
    type: String,
    required: [true, 'A Portfolio contains must be details'],
    minLength: 10,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
