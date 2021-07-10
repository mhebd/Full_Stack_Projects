import React from 'react';

import FollowCard from './FollowCard';

function UserFollowers({profile}) {
	const { user, followers} = profile;
	return (
		<div className="user-others-info-wrap">
			<div className="card">
				<div className="card-body">
					<h3 className="text-secondary mb-4">Who Following {user.name}</h3>
					<div className="row">
						{followers.length === 0 ? <p className="col-12">No followers found.</p> : null}
						{followers.map(follow => 
							<div className="col-lg-4 col-md-6 mb-3">
								<FollowCard follow={follow} />
							</div>
							)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserFollowers