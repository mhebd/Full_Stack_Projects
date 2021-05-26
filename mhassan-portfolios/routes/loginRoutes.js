const express = require('express');
const { renderLogin, loginUser } = require('./../controller/loginController');

const router = express.Router();

router.route('/').get(renderLogin).post(loginUser);

module.exports = router;
