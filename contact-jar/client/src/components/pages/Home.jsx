import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext.jsx';
import ContactContext from '../../context/contact/ContactContext.js';

import Contact from '../contactComps/Contact';
import ContactForm from '../contactComps/ContactForm';

export default function Home() {
	const { loadUser } = useContext(AuthContext);
	const { getContact, filtered } = useContext(ContactContext);
	useEffect(() => {
		if(localStorage.TOKEN !== null) {
			loadUser();
		}
	}, []);

	return (
		<>
			<div className="row">
				<div className="col-md-6 mb-3">
					<ContactForm />
				</div>
				<div className="col-md-6">
					<Contact />
				</div>
			</div>
		</>
	)
}