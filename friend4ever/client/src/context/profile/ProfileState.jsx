import React, { useReducer } from 'react';
import ProfileContext from './ProfileContext';
import ProfileReducer from './ProfileReducer';
import axios from 'axios';

import setHeader from '../../utils/setHeader';

function ProfileState(props) {
	const initialState = {
		isProfile: null,
		profile: null,
		myProfile: null,
		profiles: null,
		loading: true,
		error: null,
		success: null,
	};

	const [state, dispatch] = useReducer(ProfileReducer, initialState);

	//Create and update profile
	const createProfile = async (profile) => {
		try {
			const res = await axios.post('/api/profile', profile, {
				headers: { 'Content-Type': 'application/json'}
			});
			dispatch({
				type: 'createProfile',
				payload: res.data,
			})
		} catch (err) {
			setError(err);
		}
	};



	//Load profile 
	const loadProfile = async () => {
		//Set token in header
		if(localStorage.token) {
			setHeader(localStorage.token);
		};

		//Get profile from server
		try{
			const res = await axios(`/api/profile/me`, {
				headers: {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'loadProfile', 
				payload: res.data,
			})
		} catch (err) {
			setError(err);
		}
	};

	//Get a profile by user id 
	const getProfByUserId = async (userId) => {
		try {
			const res = await axios(`/api/profile/${userId}`);
			dispatch({
				type: 'getProfByUserId',
				payload: res.data,
			})
		} catch (err) {
			setError(err);
		}
	};

	// Get all profiles
	const getProfiles = async () => {
		try {
			const res = await axios(`/api/profile`);
			dispatch({
				type: 'getProfiles',
				payload: res.data,
			});
		} catch(err) {
			setError(err);
		}
	}

	//Add Experience
	const addExperience = async experience => {
		try{
			const res = await axios.put('/api/profile/experience', experience, {
				headers: {
					'content-type': 'application/json'
				}
			});
			dispatch({
				type: 'addExperience',
				payload: 'New experience added.'
			});
		} catch (err) {
			setError(err);
		}
	}

	//Add Education
	const addEducation = async education => {
		try{
			const res = await axios.put('/api/profile/education', education, {
				headers: {
					'content-type': 'application/json'
				}
			});
			dispatch({
				type: 'addEducation',
				payload: 'New education added.'
			});
		} catch (err) {
			setError(err);
		}
	};

	//Delete Experience
	const deleteExperience = async (exp_id) => {
		try{
			await axios.delete(`/api/profile/experience/${exp_id}`, {
				headers: {'Content-Type': 'application/json'}
			});
			loadProfile();
		} catch (err) {
			setError(err);
		}
	}


	//Delete Experience
	const deleteEducation = async (edu_id) => {
		try{
			await axios.delete(`/api/profile/education/${edu_id}`, {
				headers: {'content-type': 'application/json'}
			});
			loadProfile();
		} catch (err) {
			setError(err);
		}
	};

	//following handle 
	const followingHandle = async (followers_id) => {
		try {
			const res = await axios.put(`/api/profile/follow/${followers_id}`, {}, {
				headers: {
					'content-type': 'application/json'
				}
			});
			dispatch({
				type: 'followingHandle', 
				payload: res.data,
			})
		} catch (err) {
			setError(err);
		}
	}

	//Delete User and Profile
	const deleteProfile = async () => {
		try{
			await axios.delete('/api/profile/me');
		} catch(err) {
			setError(err)
		}
	}



	//Set error in the state
	const setError = err => {
		dispatch({
			type: 'error',
			payload: err.response.data.message,
		})
	}

	return (
		<ProfileContext.Provider value={{
			...state,
			createProfile,
			loadProfile,
			getProfiles,
			getProfByUserId,
			addExperience,
			addEducation,
			deleteExperience,
			deleteEducation,
			deleteProfile,
			followingHandle,
		}} >
			{props.children}
		</ProfileContext.Provider>
	)
}

export default ProfileState