import React, { useState, useContext,  useEffect } from 'react';

import ProfileContext from '../context/profile/ProfileContext';

import CreateProfileForm from '../components/form/CreateProfileForm';

function CreateProfile() {
	const { myProfile } = useContext(ProfileContext);
	return (
		<div className="create-profile-wrap container py-4">
			<div className="row">
				<div className="col-lg-8 col-md-10 mx-auto">
					<h3 className="theme-color">{myProfile ? 'Update Profile' : 'Create Profile'}</h3>
					<h6 className="text-secondary">
						<i className="fas fa-user mr-3"></i>
						{myProfile ? 'Edit' : 'Create'} Your Profile
					</h6>

					<div className="profile-form my-4">
						<CreateProfileForm />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateProfile