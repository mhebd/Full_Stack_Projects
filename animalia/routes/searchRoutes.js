const express = require('express');
const { renderSearch } = require('./../controllers/searchController');
const getUser = require('./../util/getUser');

const router = express.Router();

router.route('/').get(getUser, renderSearch);

module.exports = router;
