const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Animal = require('./../models/Animal');

/**
 * @GET Render about page
 */
exports.renderHome = asyncErr(async (req, res, next) => {
  let query = Animal.find();
  query = query.limit(10).sort('-created_at');
  const animals = await query;
  res.render('home', { animals: animals });
});
