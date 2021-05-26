const asyncErr = require('./../util/asyncErr');
const errHandler = require('./../util/errHandler');
const User = require('./../models/User');

/**
 * @GET Render about page
 */
exports.renderEditProfile = asyncErr(async (req, res, next) => {
  res.render('edit-profile', { user: req.user });
});

/**
 * @POST edit user profile
 */
exports.editProfile = asyncErr(async (req, res, next) => {
  const id = req.params.id;

  const getUser = await User.findById(id);

  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const professional_identity = req.body.professional_identity;
  const location = req.body.location;
  const biodata = req.body.biodata;

  let user_avatar = getUser.user_avatar;

  if (req.files.user_avatar) {
    user_avatar = req.files.user_avatar[0].filename;
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      first_name,
      last_name,
      professional_identity,
      location,
      biodata,
      user_avatar,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.redirect(`/user/${id}`);
});
