import React from 'react';

import FollowCard from './FollowCard';

function UserFollowing({profile}) {
	const { user, following} = profile;
	return (
		<div className="user-others-info-wrap">
			<div className="card">
				<div className="card-body">
					<h3 className="text-secondary mb-4">{user.name} Following Them</h3>
					<div className="row">
						{following.length === 0 ? <p className="col-12">No following found.</p> : null}
						{following.map(follow => 
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

export default UserFollowing