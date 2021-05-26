import React from 'react';
import { Link } from 'react-router-dom';

function PersonCard({person}) {
	const {name, address, avatar, type, _id} = person;

	return (
		<div className="col-md-6 mb-3">
 			<Link to={`/person/${_id}`}>
 				<div className="card card-bg text-light person-card">
	 				<div className="card-body">
	 					<div className="row">
	 						<div className="col-4">
	 							<img src={`/images/person/${avatar}`} alt={name} className="img-fluid w-100 person-img" />
	 						</div>
	 						<div className="col-8">
	 							<h6 className="text-uppercase">{name}</h6>
	 							<p className="text-capitalize mb-1">{type}</p>
	 							<p>{address}</p>
	 						</div>
	 					</div>	
	 				</div>
	 			</div>
 			</Link>
		</div>
	)
}

export default PersonCard