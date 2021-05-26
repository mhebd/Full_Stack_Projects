const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Image',
    required: [true, 'Reply must be post id'],
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Reply must be a user id'],
  },
  comment_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Comment',
    required: [true, 'Reply must be a comment id'],
  },
  reply: {
    type: String,
    maxLength: [200, 'Reply size must be less than 200 characters'],
    required: [true, 'Reply must be a Reply text'],
  },
});

module.exports = mongoose.model('Reply', replySchema);
