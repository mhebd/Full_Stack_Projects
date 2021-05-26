const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');

/**
 * @GET Render about page
 */
exports.renderAbout = asyncErr(async (req, res, next) => {
  res.render('about', { user: req.user });
});
