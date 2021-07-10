import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ProfileContext from '../context/profile/ProfileContext';

function DashBoard() {
	const [profile, setProfile] = useState(null)
	const { myProfile, deleteExperience, deleteEducation, deleteProfile } = useContext(ProfileContext);

	const deleteProfileHandle = () => {
		deleteProfile();
		window.location.reload();
	}

	useEffect(() =>{
		if(myProfile) setProfile(myProfile);
	}, [myProfile])
	return (
		<div className="dashboard-wrap container py-4">
			<h2 className="theme-color">DashBoard</h2>
			<h6 className="text-secondary">
				<i className="fas fa-user mr-3"></i>
				Welcome, {profile ? profile.user.name : null}
			</h6>

			<div className="btns my-5">
				<Link to="/dashboard/create-profile" className="ff-btn mr-3 mb-3 db-btn">{profile ? 'Edit Profile' : 'Create Profile'}</Link>
				<Link to="/dashboard/add-experience" className="ff-btn mr-3 mb-3 db-btn">Add Experience</Link>
				<Link to="/dashboard/add-education" className="ff-btn mr-3 mb-3 db-btn">Add Education</Link>
			</div>

			<div className="experience-lists mb-5">
				<h5 className="text-uppercase">Experience Lists</h5>
				<table className="table table-striped table-responsive-sm">
					<thead className="thead-dark">
						<tr>
							<th>Company</th>
							<th>Title</th>
							<th>Years</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ profile && profile.experience.length !== 0 ? profile.experience.map(exp => <tr key={exp._id} >
							<td>{exp.company}</td>
							<td>{exp.title}</td>
							<td>{new Date(exp.from).toDateString()} - {exp.current ? 'Present' : new Date(exp.to).toDateString()}</td>
							<td><button onClick={() => deleteExperience(exp._id, profile.user._id)} className="btn btn-danger">Delete</button></td>
						</tr>) : null}
					</tbody>
				</table>
			</div>

			<div className="education-lists mb-5">
				<h5 className="text-uppercase">Education Lists</h5>
				<table className="table table-striped table-responsive-sm">
					<thead className="thead-dark">
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ profile && profile.education.length !== 0 ? 
							profile.education.map(edu => 
						<tr key={edu._id}>
							<td>{edu.school}</td>
							<td>{edu.degree}</td>
							<td>{new Date(edu.from).toDateString()} - {edu.current ? 'Present' : new Date(edu.to).toDateString()}</td>
							<td><button onClick={() => deleteEducation(edu._id, profile.user._id)} className="btn btn-danger">Delete</button></td>
						</tr>) : null}
					</tbody>
				</table>
			</div>

			<button onClick={deleteProfileHandle} className="btn btn-danger">Delete My Account</button>
		</div>
	)
}

export default DashBoard