const express = require('express');
const { renderLoginPage, loginUser } = require('./../controller/loginController');

const router = express.Router();

router.route('/').get(renderLoginPage).post(loginUser);

module.exports = router;
