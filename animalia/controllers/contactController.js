const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');

/**
 * @GET Render contact page
 */
exports.renderContact = asyncErr(async (req, res, next) => {
  res.render('contact', { user: req.user });
});
