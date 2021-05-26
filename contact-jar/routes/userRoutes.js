const express =  require('express');
const { getUser, createUser } = require('../controllers/userController');
const auth =  require('../middleware/auth');

const router = express.Router();

router.route('/').get(auth, getUser).post(createUser);

module.exports =  router;