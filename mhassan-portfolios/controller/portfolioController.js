const errHandler = require('./../util/errHandler');
const asyncErr = require('./../util/asyncErr');
const Portfolio = require('./../model/Portfolio');
const Cpanel = require('./../model/Cpanel');

/**
 * @GET get all portfolio
 */
exports.getAllPortfolio = asyncErr(async (req, res, next) => {
  const portfolio = await Portfolio.find();

  res.status(200).json({
    status: true,
    portfolio: portfolio.length,
    data: portfolio,
  });
});

/**
 * @GET get portfolio web page
 */
exports.renderPortfolio = asyncErr(async (req, res, next) => {
  const cpanel = await Cpanel.findById(process.env.C_PANEL_ID);
  res.render('create-portfolio', {
    cpData: cpanel,
  });
});

/**
 * @POST post a new portfolio
 */
exports.createPortfolio = asyncErr(async (req, res, next) => {
  const name = req.body.name;
  const url = req.body.url;
  const details = req.body.details;

  const cover_image = req.files.cover_image[0].filename;

  const portfolio = await Portfolio.create({
    name,
    url,
    cover_image,
    details,
  });

  res.redirect('/c-panel');
});
