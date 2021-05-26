const express = require('express');
const { protect } = require('./../controllers/authController');
const {
  renderEditProfile,
  editProfile,
} = require('./../controllers/editProfileController');
const getUser = require('./../util/getUser');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/user');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

router
  .route('/:id')
  .get(getUser, protect, renderEditProfile)
  .post(
    getUser,
    protect,
    uploadStorage.fields([
      {
        name: 'user_avatar',
        maxCount: 1,
      },
    ]),
    editProfile
  );

module.exports = router;
