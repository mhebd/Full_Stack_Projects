const errHandler = require('./../util/errHandler');
const asyncErr = require('./../util/asyncErr');
const Cpanel = require('./../model/Cpanel');

/**
 * @GET get portfolio web page
 */
exports.renderCpanel = asyncErr(async (req, res, next) => {
  const id = process.env.C_PANEL_ID;
  const cpanel = await Cpanel.findById(id);
  res.render('cpanel', {
    cpData: cpanel,
  });
});

/**
 * @POST post a new portfolio
 */
exports.updateCpanel = asyncErr(async (req, res, next) => {
  const id = process.env.C_PANEL_ID;
  const cpOldData = await Cpanel.findById(id);
  const {
    banner,
    main_web_link,
    fiverr_link,
    quote,
    cv_down_link,
    about,
  } = req.body;

  // console.log(req.files, cpOldData);

  let logo = '';
  let profile_image = '';

  if (!req.files.logo) {
    logo = cpOldData.logo;
  } else {
    logo = req.files.logo[0].filename;
  }

  if (!req.files.profile_image) {
    profile_image = cpOldData.profile_image;
  } else {
    profile_image = req.files.profile_image[0].filename;
  }

  // const cpanel = await Cpanel.create({
  //   banner,
  //   main_web_link,
  //   fiverr_link,
  //   quote,
  //   cv_down_link,
  //   logo,
  //   profile_image,
  //   about,
  // });

  const cpanel = await Cpanel.findByIdAndUpdate(
    id,
    {
      banner,
      main_web_link,
      fiverr_link,
      quote,
      cv_down_link,
      logo,
      profile_image,
      about,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.redirect('/c-panel');
});
