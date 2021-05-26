const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const User = require('./../models/User');

/**
 * @GET Render about page
 */
exports.renderSignup = asyncErr(async (req, res, next) => {
  if (req.user) {
    res.redirect('/home');
  } else {
    res.render('signup', { user: req.user });
  }
});

/**
 * @POST create a new user
 */
exports.createUser = asyncErr(async (req, res, next) => {
  const first_name = req.body.fname;
  const last_name = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.c_password;

  const user = await User.create({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  });
  res.redirect('/home');
});
