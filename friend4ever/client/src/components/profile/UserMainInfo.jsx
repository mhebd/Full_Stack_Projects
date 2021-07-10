import React, { useContext, useState, useEffect}  from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

import ProfileContext from '../../context/profile/ProfileContext';

function UserMainInfo({profile, page}) {
	const { user, status, bio, social } = profile;

	const [myProf, setMyProf] = useState(null);

	const { myProfile, followingHandle } = useContext(ProfileContext);

	useEffect(() => {
		if(myProfile) setMyProf(myProfile);
	}, [myProfile]);
	
	return (
		<div className="user-info-wrap">
			<div className="user-main-info">
				<div className="d-flex flex-column align-items-center text-light p-3 p-sm-5">
						<img src={`https:${user.avatar}`} alt="" className="img-fluid user-avatar mb-5" />
						<h4 className="user-name text-uppercase">{user.name}</h4>
						<p className="user-status">{status}</p>
						<div className="row w-100">
							<div className="col-md-8 mx-auto">
								<p className="lead user-bio text-center">
									{bio}
								</p>
							</div>
						</div>

						<div className="social-wrap mb-3">
							<ul className="nav justify-content-center">
								{social && social.facebook ? <li className="nav-item">
									<a href={social.facebook} target="_blank" className="nav-link">
										<i className="fab sl fa-facebook text-light"></i>
									</a>
								</li> : null}
								{social && social.twitter ? <li className="nav-item">
									<a href={social.twitter} target="_blank" className="nav-link">
										<i className="fab sl fa-twitter text-light"></i>
									</a>
								</li> : null}
								{social && social.linkedin ? <li className="nav-item">
									<a href={social.linkedin} target="_blank" className="nav-link">
										<i className="fab sl fa-linkedin text-light"></i>
									</a>
								</li> : null}
								{social && social.instagram ? <li className="nav-item">
									<a href={social.instagram} target="_blank" className="nav-link">
										<i className="fab sl fa-instagram text-light"></i>
									</a>
								</li> : null}
								{social && social.youtube ? <li className="nav-item">
									<a href={social.youtube} target="_blank" className="nav-link">
										<i className="fab sl fa-youtube text-light"></i>
									</a>
								</li> : null}
								{social && social.website ? <li className="nav-item">
									<a href={social.website} target="_blank" className="nav-link">
										<i className="fas sl fa-globe text-light"></i>
									</a>
								</li> : null}
							</ul>
						</div>

						{myProf && user._id !== myProf.user._id ? 
							<button 
							className={`btn ${myProf && myProf.following.filter(fol => fol.user_id.toString() === user._id.toString() ).length > 0 ? 'btn-danger' : 'btn-success'}`} 
							onClick={() => followingHandle(user._id)} >
							{myProf && myProf.following.filter(fol => fol.user_id.toString() === user._id.toString() ).length > 0 ? 'Unfollow' : 'Follow'} {user.name}
							</button> : 
							null}
				</div>
				<div className="profile-nav px-3">
					<ul className="nav">
						<li className="nav-item">
							<NavLink to={`/profile?user_id=${user._id}&page=about`} className={`nav-link text-light ${page && page === 'about' ? 'p-active' : null }`}>About Me</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to={`/profile?user_id=${user._id}&page=post`} className={`nav-link text-light ${page && page === 'post' ? 'p-active' : null }`}>My Post</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to={`/profile?user_id=${user._id}&page=following`} className={`nav-link text-light ${page && page === 'following' ? 'p-active' : null }`}>Following</NavLink>
						</li>
						<li className="nav-item">
							<NavLink to={`/profile?user_id=${user._id}&page=followers`} className={`nav-link text-light ${page && page === 'followers' ? 'p-active' : null }`}>Followers</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default UserMainInfo