const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Animal = require('./../models/Animal');

/**
 * @GET Render animals page
 */
exports.renderSearch = asyncErr(async (req, res, next) => {
  const search = req.query.q;
  const count = await Animal.find({ name: { $regex: search, $options: 'i' } });

  const page = req.query.page * 1;
  const limit = req.query.limit * 1;

  const skip = (page - 1) * limit;

  let query = Animal.find({
    name: { $regex: search, $options: 'i' },
  });
  query = query.sort('-created_at');
  query = query.skip(skip).limit(limit);
  const animals = await query;

  res.render('search', {
    user: req.user,
    animals: animals,
    count: count.length,
    p: page,
    l: limit,
    s: search,
  });
});
