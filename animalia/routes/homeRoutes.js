const express = require('express');
const { renderHome } = require('./../controllers/homeController');

const router = express.Router();

router.route('/').get(renderHome);

module.exports = router;
