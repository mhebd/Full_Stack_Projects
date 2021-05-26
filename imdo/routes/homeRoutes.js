const express = require('express');
const { protect, authorize } = require('./../controller/auth');
const { getAllImage } = require('./../controller/homeController');
const router = express.Router();

router.route('/').get(protect, getAllImage);

module.exports = router;
