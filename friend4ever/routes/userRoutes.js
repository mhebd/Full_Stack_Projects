const express =  require('express');
const { createUser, loginUser, users, singUser, singUserById } = require('../controller/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/').get(auth, users);
router.route('/me').get(auth, singUser);
router.route('/:user_id').get(auth, singUserById);

module.exports = router;