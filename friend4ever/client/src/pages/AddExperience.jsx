import React from 'react';

import CreateExperience from '../components/form/CreateExperience';

function AddExperience() {
	return (
		<div className="create-profile-wrap container py-4">
			<div className="row">
				<div className="col-lg-8 col-md-10 mx-auto">
					<h3 className="theme-color">Experience</h3>
					<h6 className="text-secondary">
						<i className="fas fa-user mr-3"></i>
						Add A New Experience
					</h6>

					<div className="profile-form my-4">
						<CreateExperience />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddExperience;