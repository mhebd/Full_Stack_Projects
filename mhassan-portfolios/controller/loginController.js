const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Cpanel = require('./../model/Cpanel');
const jwt = require('jsonwebtoken');

/**
 * @GET render Portfolio page
 */
exports.renderLogin = asyncErr(async (req, res, next) => {
  const cpanel = await Cpanel.findById(process.env.C_PANEL_ID);

  res.render('login', {
    cpanel,
  });
});

/**
 * @GET render Portfolio page
 */
exports.loginUser = asyncErr(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new errHandler('Please provide a valid email and password'),
      400
    );
  }

  // const findUser = await User.findOne({ email: email }).select('+password');
  let checkEmail = false;
  let checkPassword = false;
  if (email === process.env.USER_EMAIL) {
    checkEmail = true;
  }
  if (password === process.env.PASSWORD) {
    checkPassword = true;
  }

  if (!checkEmail || !checkPassword) {
    return next(
      new errHandler('Your password Or email did not match on database', 404)
    );
  }

  const token = jwt.sign(
    { id: process.env.C_PANEL_ID },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION,
    }
  );

  res.cookie('TOKEN', token, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  });

  console.log(token);

  res.redirect('/c-panel');
});
