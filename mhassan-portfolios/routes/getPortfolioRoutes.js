const express = require('express');
const {
  getAllPortfolio,
  getPortfolio,
} = require('./../controller/getPortfolioController');

const router = express.Router();
router.route('/').get(getAllPortfolio);
router.route('/:id').get(getPortfolio);

module.exports = router;
