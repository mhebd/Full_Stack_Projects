import React, { useContext, useState, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext';

function ContactForm() {
	const { addContact, current, clearCurrent, updateContact } = useContext(ContactContext);

	const [contact, setContact] = useState({
		name : '',
		email : '',
		phone : '',
		type : 'personal'
	});

	useEffect(() => {
		if( current ) {
			setContact(current);
		} else {
			setContact({
				name : '',
				email : '',
				phone : '',
				type : 'personal'
			})
		}
	}, [ContactContext, current]);

	const onChangeHandler = e => setContact({ ...contact, [e.target.name] : e.target.value });

	const onSubmitHandler = e => {
		e.preventDefault();
		
		if(current) {
			updateContact(contact);
			clearCurrent();
		} else {
			addContact(contact);
		}

		setContact({
			name : '',
			email : '',
			phone : '',
			type : 'personal'
		})
	}

	return (
		<> 
			<div className="card">
				<div className="card-header">
					<h3 className="text-center text-info">{current ? 'Update Contact' : 'Add Contact'}</h3>
				</div>
				<div className="card-body">
					<form onSubmit={(e) => onSubmitHandler(e)} className="form">
						<div className="form-group mb-3">
							<input type="text" name="name" className="form-control" value={contact.name}  placeholder="Name" onChange={onChangeHandler} />
						</div>
						<div className="form-group mb-3">
							<input type="email" name="email" className="form-control" value={contact.email}  placeholder="Email" onChange={onChangeHandler} />
						</div>
						<div className="form-group mb-3">
							<input type="text" name="phone" className="form-control" value={contact.phone}  placeholder="Phone" onChange={onChangeHandler} />
						</div>
						<div className="form-group mb-3">
							<label className="d-block mb-1">Contact Type :</label>
							<input type="radio" name="type" value="personal" checked={contact.type === 'personal'} onChange={onChangeHandler} /> personal <br />
							<input type="radio" name="type" value="professional" checked={contact.type === 'professional'} onChange={onChangeHandler} /> professional
						</div>
						<div className="form-groups">
							<button type="submit" className="btn btn-info btn-block">{current ? 'Update Contact' : 'Add Contact'}</button>
							{current && <button className="btn btn-danger btn-block mt-3" onClick={clearCurrent} >Clear</button>}
						</div>
					</form >
				</div>
			</div>
		</>
	)
}

export default ContactForm