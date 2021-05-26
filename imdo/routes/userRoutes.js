const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
} = require('./../controller/userController');
const { protect, authorize } = require('./../controller/auth');

const router = express.Router();

router.route('/').get(protect, getAllUsers).post(createUser);
router.route('/:id').get(protect, getUser);

module.exports = router;
