const express = require('express');
const { protect, authorize } = require('./../controller/auth');
const { getImage, createComment } = require('./../controller/singleController');
const router = express.Router();

router.route('/:id').get(protect, getImage).post(protect, createComment);

module.exports = router;
