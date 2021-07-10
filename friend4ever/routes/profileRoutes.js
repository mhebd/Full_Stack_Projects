const express =  require('express');
const { 
	createProfile, 
	allProfiles, 
	profile, 
	deleteUserAndProfile, 
	getProfileById, 
	createExperience, 
	deleteExperience, 
	createEducation, 
	deleteEducation, 
	followingHandle,
} = require('../controller/profileController');
const auth = require('../middleware/auth');

const router = express.Router();

router.route('/').post(auth, createProfile).get(auth, allProfiles);
router.route('/me').get(auth, profile).delete(auth, deleteUserAndProfile);
router.route('/:user_id').get(auth, getProfileById);
router.route('/experience').put(auth, createExperience);
router.route('/experience/:exp_id').delete(auth, deleteExperience);
router.route('/education').put(auth, createEducation);
router.route('/education/:edu_id').delete(auth, deleteEducation);
router.route('/follow/:followers_id').put(auth, followingHandle);

module.exports = router;