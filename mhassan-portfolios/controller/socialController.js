const errHandler = require('./../util/errHandler');
const asyncErr = require('./../util/asyncErr');
const Social = require('./../model/Social');
const Cpanel = require('./../model/Cpanel');

/**
 * @GET get all portfolio
 */
exports.getAllSocial = asyncErr(async (req, res, next) => {
  const social = await Social.find();

  res.status(200).json({
    status: true,
    social: social.length,
    data: social,
  });
});

/**
 * @GET get portfolio web page
 */
exports.renderSocial = asyncErr(async (req, res, next) => {
  const cpanel = await Cpanel.findById(process.env.C_PANEL_ID);
  res.render('create-social', {
    cpData: cpanel,
  });
});

/**
 * @POST post a new portfolio
 */
exports.createSocial = asyncErr(async (req, res, next) => {
  const data = req.body;
  console.log(req.body);

  // console.log(req.files.cover_image);

  // const name = req.body.name;
  // const url = req.body.url;
  // const details = req.body.details;

  // const cover_image = req.files.cover_image[0].filename;
  // let images = [];

  // req.files.images.forEach((image) => {
  //   images.push(image.filename);
  // });

  // console.log(cover_image, images);

  const social = await Social.create(data);

  res.redirect('/c-panel');
});
