const express = require('express');
const { renderHome } = require('./../controller/homeController');
const router = express.Router();

router.route('/').get(renderHome);

module.exports = router;
