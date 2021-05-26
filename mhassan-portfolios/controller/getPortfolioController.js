const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const Portfolio = require('./../model/Portfolio');
const Cpanel = require('./../model/Cpanel');

/**
 * @GET render all Portfolio page
 */
exports.getAllPortfolio = asyncErr(async (req, res, next) => {
  const portfolios = await Portfolio.find();
  const cpanel = await Cpanel.findById(process.env.C_PANEL_ID);
  res.render('portfolios', {
    portfolios,
    cpanel,
  });
});

/**
 * @GET render Portfolio page
 */
exports.getPortfolio = asyncErr(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);
  const cpanel = await Cpanel.findById(process.env.C_PANEL_ID);
  res.render('portfolio', {
    portfolio,
    cpanel,
  });
});
