import React from 'react';
import { Link } from 'react-router-dom';

function UserCard({profile}) {
	const { user, location, _id } = profile;
	return (
		<div className="user-card card mb-3">
			<div className="card-body">
				<div className="row">
					<div className="col-md-4 col-lg-3 d-flex justify-content-center align-items-center">
						<img src={`https:${user.avatar}`} alt="" className="img-fluid rounded-circle" />
					</div>
					<div className="col-md-8 col-lg-9 text-md-left text-center">
						<Link to={`/profile?user_id=${user._id}&page=about`} className="text-uppercase font-weight-bold theme-color">{user.name}</Link>
						<p className="small">{location}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserCard