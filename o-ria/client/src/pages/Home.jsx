import React, { useState, useContext, useEffect } from 'react';
import PersonContext from '../context/person/PersonContext';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext';

import Search from '../components/home/Search.jsx';
import PersonCard from '../components/home/PersonCard';

function Home() {
	const { getPersons, persons, filter, error } = useContext(PersonContext);
	const { setAlert } = useContext(AlertContext);
	const { loadUser } = useContext(AuthContext);
	const [personList, setPersonList] = useState();

	useEffect(() => {
		loadUser();
		getPersons();
		setPersonList(persons);
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if(filter) {
			setPersonList(filter);
		} else {
			setPersonList(persons);
		}
		// eslint-disable-next-line
	}, [persons, filter]);

	useEffect(() => {
		if(error.length > 0) {
			error.forEach(err => setAlert(err.msg, 'info'))
		}
		// eslint-disable-next-line
	}, [error]);

	return (
		<div className="home-wrap">
			<Search />
			<div className="person-card-wrap row pt-5">
				{personList ? personList.length === 0 ? (<p className="lead ml-5 text-light">Add Some Person Profile</p>) :  personList.map(person => <PersonCard key={person._id} person={person} />) : (<p className="lead ml-5 text-light">Loading...</p>)}
			</div>	
		</div>
	)
}

export default Home