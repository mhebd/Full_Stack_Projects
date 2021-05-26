const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const User = require('./../models/User');
const Animal = require('./../models/Animal');

/**
 * @GET Render about page
 */
exports.renderProfile = asyncErr(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  const count = await Animal.find({ user_id: id });

  const page = req.query.page * 1;
  const limit = req.query.limit * 1;

  const skip = (page - 1) * limit;

  let query = Animal.find({ user_id: id });
  query = query.sort('-created_at').skip(skip).limit(limit);
  const animals = await query;

  res.render('profile', {
    user: user,
    curUser: req.user,
    animals: animals,
    count: count.length,
    p: page,
    l: limit,
  });
});
