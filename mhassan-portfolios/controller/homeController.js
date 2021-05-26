const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Portfolio = require('./../model/Portfolio');
const Social = require('./../model/Social');
const Cpanel = require('./../model/Cpanel');

/**
 * @GET render home page
 */
exports.renderHome = asyncErr(async (req, res, next) => {
  const portfolios = await Portfolio.find();
  const socials = await Social.find();
  const cpanel = await Cpanel.findById(process.env.C_PANEL_ID);
  res.render('home', {
    portfolios,
    socials,
    cpanel,
  });
});
