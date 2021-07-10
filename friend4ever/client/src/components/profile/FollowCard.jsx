import React from 'react';
import { Link } from 'react-router-dom';

function FollowCard({follow}) {
	const {user_id, name, avatar, location} = follow;
	return (
		<div className="card mb-3">
			<div className="card-body">
				<div className="row">
					<div className="col-3 d-flex justify-content-center align-items-center">
						<img src={`https:${avatar}`} alt="" className="img-fluid rounded-circle" />
					</div>
					<div className="col-9">
						<Link to={`/profile?user_id=${user_id}&page=about`} className="text-uppercase font-weight-bold theme-color">{name}</Link>
						<p className="small">{location}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FollowCard