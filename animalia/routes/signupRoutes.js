const express = require('express');
const getUser = require('./../util/getUser');
const {
  renderSignup,
  createUser,
} = require('./../controllers/signupController');

const router = express.Router();

router.route('/').get(getUser, renderSignup).post(getUser, createUser);

module.exports = router;
