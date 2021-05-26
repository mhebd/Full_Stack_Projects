const express = require('express');
const { protect, authorize } = require('./../controller/auth');
const {
  getAllImage,
  createImage,
  getImage,
  updateImage,
  deleteImage,
} = require('./../controller/imageController');
const router = express.Router();

router.route('/').get(protect, getAllImage).post(protect, createImage);
router
  .route('/:id')
  .get(protect, authorize('admin'), getImage)
  .put(protect, authorize('admin'), updateImage)
  .delete(protect, authorize('admin'), deleteImage);

module.exports = router;
