const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');

/**
 * @GET Logout and render home
 */
exports.logout = asyncErr(async (req, res, next) => {
  res.cookie('TOKEN', 'token', {
    maxAge: 0,
    httpOnly: true,
  });
  res.redirect('/home');
});
