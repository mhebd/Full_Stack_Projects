const express = require('express');
const { getUser } = require('./../controller/singleUserController');
const { protect, authorize } = require('./../controller/auth');

const router = express.Router();

router.route('/:id').get(protect, getUser);

module.exports = router;
