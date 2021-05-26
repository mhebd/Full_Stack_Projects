const express = require('express');
const { renderAbout } = require('./../controllers/aboutController');
const getUser = require('./../util/getUser');
const { logout } = require('./../controllers/logoutController');

const router = express.Router();

router.route('/').get(getUser, logout);

module.exports = router;
