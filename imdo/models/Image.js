const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'A image is required'],
    unique: true,
  },
  details: {
    type: String,
    required: [true, 'Image detail is required [Max- 500 char, Min- 50 char]'],
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
    },
  ],
  comments: [
    {
      user_id: mongoose.Schema.ObjectId,
      user_name: String,
      user_image: String,
      comment: String,
      createdAt: {
        type: Date,
        defaule: Date.now,
      },
    },
  ],
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
