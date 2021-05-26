const express = require('express');
const { protect, authorize } = require('./../controller/auth');
const Image = require('./../models/Image');
const router = express.Router();

router.route('/:id').put(protect, async (req, res, next) => {
  const id = req.params.id;
  const userId = req.body.user_id;
  const post = await Image.findById(id);
  if (post.likes.includes(userId)) {
    await Image.findByIdAndUpdate(id, {
      $pull: { likes: userId },
    });
  } else {
    await Image.findByIdAndUpdate(id, {
      $push: { likes: [userId] },
    });
  }
});

module.exports = router;
