import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import PersonContext from '../context/person/PersonContext';
import AlertContext from '../context/alert/AlertContext';

function Person({match}) {
	const id = match.params.id;
	const { getPerson, person, deletePerson, setCurrent, error } = useContext(PersonContext);
	const { setAlert } = useContext(AlertContext);

	const [singPerson, setSingPerson] = useState();

	useEffect(() => {
		getPerson(id);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if(error.length > 0) {
			error.forEach(err => setAlert(err.msg, 'info'))
		};
		// eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		setSingPerson(person);
		// eslint-disable-next-line
	}, [person]);

	return (
		singPerson ? (
			<div className="single-person-wrap">
				<div className="row">
					<div className="col-sm-6 col-md-5 mb-3">
						<img src={`/images/person/${singPerson.avatar}`} alt={singPerson.name} className="img-fluid w-100" />
					</div>
					<div className="col-sm-6 col-md-7 mb-3">
						<p className="lead font-weight-bold">Name: {singPerson.name}</p>
						<p className="lead">Relation: {singPerson.type}</p>
						<p className="lead">Age: {singPerson.age}</p>
						{singPerson.email && <p className="lead">Eamil: {singPerson.email}</p> }
						{singPerson.phone && <p className="lead">Phone: {singPerson.phone}</p> }
						<p className="lead">Address: {singPerson.address}</p>
					</div>
					<div className="col-12 person-details my-4">
						<h6>About <span className="theme-color text-uppercase">{singPerson.name}</span> </h6>
						<p className="lead">{singPerson.details}</p>
					</div>

					<div className="btn-group mx-auto">
						<Link to="/update-person" className="btn btn-success" onClick={() => setCurrent(singPerson)} ><i className="fas fa-pen mr-3"></i>Edit {singPerson.name}</Link>
						<Link to="/" className="btn btn-danger" onClick={() => deletePerson(singPerson._id)} ><i className="fas fa-trash mr-3"></i> Delete {singPerson.name}</Link>
					</div>
				</div>
			</div>
		) : (<p className="lead text-center text-light">Loading...</p>)
	)
}

export default Person