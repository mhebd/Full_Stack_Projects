const express = require('express');
const multer = require('multer');
const { protect } = require('./../controllers/authController');
const getUser = require('./../util/getUser');
const {
  renderUpdateAnimal,
  updateAnimal,
} = require('./../controllers/updateAnimlaController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/post');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

router
  .route('/:id')
  .get(protect, getUser, renderUpdateAnimal)
  .post(
    protect,
    getUser,
    uploadStorage.fields([
      {
        name: 'cover_image',
        maxCount: 1,
      },
      {
        name: 'images',
        maxCount: 12,
      },
    ]),
    updateAnimal
  );
module.exports = router;
