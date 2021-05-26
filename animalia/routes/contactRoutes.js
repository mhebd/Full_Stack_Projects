const express = require('express');
const { renderContact } = require('./../controllers/contactController');
const getUser = require('./../util/getUser');

const router = express.Router();

router.route('/').get(getUser, renderContact);

module.exports = router;
