const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Animal = require('./../models/Animal');
const User = require('./../models/User');

/**
 * @GET Render animals page
 */
exports.renderAnimals = asyncErr(async (req, res, next) => {
  const count = await Animal.find();

  const page = req.query.page * 1;
  const limit = req.query.limit * 1;

  const skip = (page - 1) * limit;

  let query = Animal.find();
  query = query.sort('-created_at');
  query = query.skip(skip).limit(limit);
  const animals = await query;

  res.render('animals', {
    user: req.user,
    animals: animals,
    count: count.length,
    p: page,
    l: limit,
  });
});

/**
 * @GET render single animal page
 */
exports.renderSingleAnimal = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const animal = await Animal.findById(id);
  const postUser = await User.findById(animal.user_id);
  res.render('singleAnimal', {
    user: req.user,
    animal: animal,
    postUser: postUser,
  });
});
