
const ProfileReducer = (state, action) => {
	switch (action.type) {
		case 'createProfile':
			return {
				...state,
				myProfile: action.payload.profile,
				isProfile: true,
				loading: false,
				error: null,
				success: 'Profile Saved',
			};
			break;

		case 'addExperience':
		case 'addEducation':
			return {
				...state,
				success: action.payload,
				error: null,
			};
			break;

		case 'loadProfile':
			return {
				...state, 
				isProfile: true, 
				myProfile: action.payload.profile, 
				error: null,
			};
			break;

		case 'getProfByUserId':
			return {
				...state,  
				...action.payload, 
				loading: false,
				error: null,
			};
			break;

		case 'getProfiles':
			return {
				...state,  
				...action.payload, 
				loading: false,
				error: null,
			};
			break;

		case 'followingHandle':
			return {
				...state,
				myProfile: {...state.myProfile, following: action.payload.userProfile.following},
				loading: false,
			};
			break;

		case 'error':
			return {
				...state,
				isProfile: false, 
				loading: false,
				profile: null,
				error: action.payload,
				success: null,
			};
			break;

		default:
			return {
				...state
			};
			break;
	}
};

export default ProfileReducer;