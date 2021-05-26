import React, { useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

import Filter from './Filter.jsx';
import ContactItem from './ContactItem';

function Contact() {
	const { contacts, getContact, filtered } = useContext(ContactContext);

	useEffect(() => {
		getContact();
	}, [contacts])
	return (
		<>
			<Filter />
			<div className="alert alert-info mb-3">Total Contact : {contacts.length}
			</div>
			{
				filtered ? 
				(filtered.map(contact => <ContactItem key={contact._id} contact={contact} />)) : 
				(contacts.map(contact => <ContactItem key={contact._id} contact={contact} />))
			}
		</>
	)
}

export default Contact