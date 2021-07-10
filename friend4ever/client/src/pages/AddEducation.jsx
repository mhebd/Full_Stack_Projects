import React from 'react';

import CreateEducation from '../components/form/CreateEducation';

function AddEducation() {
	return (
		<div className="create-profile-wrap container py-4">
			<div className="row">
				<div className="col-lg-8 col-md-10 mx-auto">
					<h3 className="theme-color">Education</h3>
					<h6 className="text-secondary">
						<i className="fas fa-user mr-3"></i>
						Add A New Education
					</h6>

					<div className="profile-form my-4">
						<CreateEducation />
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddEducation;