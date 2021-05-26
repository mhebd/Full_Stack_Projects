const express = require('express');
const {
  renderAnimals,
  renderSingleAnimal,
} = require('./../controllers/animalsController');
const getUser = require('./../util/getUser');

const router = express.Router();

router.route('/').get(getUser, renderAnimals);

router.route('/:id').get(getUser, renderSingleAnimal);

module.exports = router;
