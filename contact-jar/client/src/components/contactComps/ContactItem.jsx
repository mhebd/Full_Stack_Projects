import React, { useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext.js';

function ContactItem({contact}) {
	const { deleteContact, setCurrent } = useContext(ContactContext);
	const { _id, name, email, phone, type } = contact;
	return (
		<>
			<div className="card mb-3">
				<div className="card-body contact-card">
					<span className={`badge p-1 type-badge badge-${type === 'personal' ? 'info' : 'success'} text-uppercase`}>{type}</span>

					<h4 className="text-capitalize">{name}</h4>
					{email && <p><i className="fas fa-envelope"></i> {email}</p>}
					{phone && <p><i className="fas fa-phone"></i> {phone}</p>}

					<div className="btns">
						<button className="btn btn-dark mr-3" onClick={() => setCurrent(contact)} >Edit</button>
						<button className="btn btn-danger mr-3" onClick={() => deleteContact(_id)} >Delete</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default ContactItem