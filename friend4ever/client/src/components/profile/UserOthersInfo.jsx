import React from 'react';

import ExpCard from './ExpCard';
import EduCard from './EduCard';

function UserOthersInfo({profile}) {
	const { user, skills, education, experience, status, location, nickName, phone, ...social } = profile;
	return (
		<div className="user-others-info-wrap">
			<div className="card">
				<div className="card-body">
					<div className="row">
						<div className="col-md-6 mb-3">
							<h5 className="mb-4 text-uppercase text-secondary">Contact Information</h5>
							{phone !== '' ? <p><strong><i className="fas fa-phone theme-color mr-4"></i></strong> {phone}</p> : null}
							{user.email !== '' ? <p><strong><i className="fas fa-envelope theme-color mr-4"></i></strong> {user.email}</p> : null}
							{location !== '' ? <p><strong><i className="fas fa-map theme-color mr-4"></i></strong> {location}</p> : null}
						</div>
						<div className="col-md-6 mb-3">
								<h5 className="mb-4 text-uppercase text-secondary">Nick Names</h5>
								<p className="mb-4">{nickName}</p>

								<h5 className="mb-4 text-uppercase text-secondary">Professional Skills</h5>
								<ul className="list-unstyled">
									{skills.map((skill, i) => <li key={i} className="list-item"><i className="fas fa-arrow-right theme-color mr-4"></i>{skill}</li>) }
								</ul>
						</div>
						<div className="col-md-6 mb-3">
							<div className="experience-wrap">
								<h5 className="mb-4 text-uppercase text-secondary">Experience History</h5>

								{experience.length !== 0 ? experience.map(exp => <ExpCard key={exp._id} exp={exp} />) : 'Add Your Experience'}			
							</div>
						</div>
						<div className="col-md-6 mb-3">
							<div className="education-wrap">
								<h5 className="mb-4 text-uppercase text-secondary">Education History</h5>

								{education.length !== 0 ? education.map(edu => <EduCard key={edu._id} edu={edu} />) : 'Add Your Education.'}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserOthersInfo