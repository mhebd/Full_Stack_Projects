const express = require('express');
const {
  getEditProfile,
  postEditProfile,
} = require('./../controller/singleUserController');
const { protect, authorize } = require('./../controller/auth');

const router = express.Router();

router
  .route('/:id')
  .get(protect, getEditProfile)
  .post(protect, postEditProfile);

module.exports = router;
