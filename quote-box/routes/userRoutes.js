const express =  require('express');

//Controller implements
const auth = require('../middleware/auth');
const { getSingleUser, registerUser, loginUser } =  require('../controller/userController');

const router = express.Router();

router.route('/profile').get(auth, getSingleUser)
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;

