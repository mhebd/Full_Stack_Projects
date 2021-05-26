const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Image',
    required: [true, 'Comment must be post id'],
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Comment must be a user id'],
  },
  comment: {
    type: String,
    maxLength: [200, 'Comment size must be less than 200 characters'],
    required: [true, 'Comment must be a comment text'],
  },
});

module.exports = mongoose.model('Comment', commentSchema);
