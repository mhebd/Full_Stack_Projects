const express = require('express');
const { protect, author } = require('./../controller/auth');
const {
  getAllSocial,
  renderSocial,
  createSocial,
} = require('./../controller/socialController');

const router = express.Router();

router.route('/all').get(getAllSocial);

router.route('/').get(protect, renderSocial).post(protect, createSocial);

module.exports = router;
