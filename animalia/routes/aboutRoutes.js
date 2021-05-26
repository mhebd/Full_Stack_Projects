const express = require('express');
const { renderAbout } = require('./../controllers/aboutController');
const getUser = require('./../util/getUser');

const router = express.Router();

router.route('/').get(getUser, renderAbout);

module.exports = router;
