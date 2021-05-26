const express = require('express');
const { renderProfile } = require('./../controllers/userController');
const { protect } = require('./../controllers/authController');

const getUser = require('./../util/getUser');

const router = express.Router();

router.route('/:id').get(getUser, protect, renderProfile);

module.exports = router;
