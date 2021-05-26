const express = require('express');
const { renderLogin, loginUser } = require('./../controllers/loginController');
const getUser = require('./../util/getUser');

const router = express.Router();

router.route('/').get(getUser, renderLogin).post(getUser, loginUser);

module.exports = router;
