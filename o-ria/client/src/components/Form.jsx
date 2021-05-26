import React, { useState, useContext, useEffect } from 'react'
import PersonContext from '../context/person/PersonContext';
import AlertContext from '../context/alert/AlertContext';

function Form() {
	const { createPerson, current, updatePerson, error } = useContext(PersonContext);
	const { setAlert } = useContext(AlertContext);

	const [person, setPerson] = useState({
		name: '',
		email: '',
		phone: '',
		age: '',
		address: '',
		details: '',
		type: 'friend',
	});
	const [avatar, setAvatar] = useState('');
	const [isCurrent, setIsCurrent] = useState(false);

	useEffect(() => {
		if(current) {
			setPerson({...current});
			setIsCurrent(true);
		};
	}, [current]);

	useEffect(() => {
		if(error.length > 0) {
			error.forEach(err => setAlert(err.msg, 'info'))
		};
		// eslint-disable-next-line
	}, [error])

	const { name, email, phone,  age, address, details, type } = person;

	const onChange = e => setPerson({...person, [e.target.name] : e.target.value});	

	const onChangeFile = e => setAvatar(e.target.files[0])

	let formData = new FormData();
			if(avatar) formData.append('avatar', avatar);
			if(name) formData.append('name', name);
			if(email) formData.append('email', email);
			if(phone) formData.append('phone', phone);
			if(age) formData.append('age', age);
			if(address) formData.append('address', address);
			if(details) formData.append('details', details);
			if(type) formData.append('type', type);

	const clearForm = () => {
		setPerson({
			name: '',
			email: '',
			phone: '',
			age: '',
			address: '',
			details: '',
			type: 'friend',
		});
	}

	const onSubmit = e => {
		e.preventDefault();

		if(isCurrent) {
			if(!name || !address || !age || !details) {
				setAlert('All the * fields are required.', 'danger');
			}  else {
				updatePerson(formData, person._id);
				clearForm();
				setAlert(`${person.name}'s profile is updated`, 'success');
			};
		} else {
			if(!name || !address || !avatar || !age || !details) {
				setAlert('All the * fields are required.', 'danger');
			}  else {
				createPerson(formData);
				clearForm();
				setAlert(`${person.name}'s profile is created`, 'success');
			};
		}

	}

	return (
		<form className="form" encripttype="multipart/form-data" onSubmit={e => onSubmit(e)}>
			<h3 className="text-center mb-4 theme-color">{isCurrent ? `Update ${person.name}` : 'Create A New Profile.'}</h3>

			<div className="form-group mb-3">
				<label htmlFor="name">Person Name: <span className="text-danger">*</span></label>
				<input type="text" name="name" placeholder="Person Name" value={name} className="form-control" onChange={e => onChange(e)} />
			</div>
			
			<div className="form-group mb-3">
				<label htmlFor="email">Person Email:</label>
				<input type="email" name="email" placeholder="Person Email" value={email} className="form-control" onChange={e => onChange(e)} />
			</div>

			<div className="form-group mb-3">
				<label htmlFor="phone">Person Phone:</label>
				<input type="text" name="phone" placeholder="Person Phone" value={phone} className="form-control" onChange={e => onChange(e)} />
			</div>
			
			<div className="form-group mb-3">
				<label htmlFor="age">Person Age:: <span className="text-danger">*</span></label>
				<input type="number" name="age" placeholder="Person Age" value={age} className="form-control" onChange={e => onChange(e)} />
			</div>
			
			<div className="form-group mb-3">
				<label htmlFor="address">Person Address: <span className="text-danger">*</span></label>
				<input type="text" name="address" placeholder="Person Address" value={address} className="form-control" onChange={e => onChange(e)} />
			</div>
			
			<div className="form-group mb-3">
				<label htmlFor="phone">Person Avatar: <span className="text-danger">*</span></label>
				<input type="file" className="form-control" onChange={e => onChangeFile(e)} />
			</div>
				
			<div className="form-group mb-3">
				<label htmlFor="phone">Person Type:</label>
				<div>
					<input type="radio" name="type" value="friend" checked={type === 'friend' ? true : false } onChange={e => onChange(e)} /> 
					<label htmlFor="friend">Friend</label><br />

					<input type="radio" name="type" value="family" checked={type === 'family' ? true : false } onChange={e => onChange(e)}  /> 
					<label htmlFor="family">Family</label><br />

					<input type="radio" name="type" value="relative" checked={type === 'relative' ? true : false } onChange={e => onChange(e)} /> 
					<label htmlFor="relative">Relative</label><br />

					<input type="radio" name="type" value="others" checked={type === 'others' ? true : false } onChange={e => onChange(e)} /> 
					<label htmlFor="others">Others</label>
				</div>
			</div>
				
			<div className="form-group mb-3">
				<label htmlFor="phone">Person Details:: <span className="text-danger">*</span></label>
				<textarea name="details" cols="30" rows="10" className="form-control" onChange={e => onChange(e)} value={details} placeholder="Person Details..."></textarea>
			</div>		

			<div className="form-group mb-3">
				<button type="submit" className="btn text-light theme-bg btn-block">{isCurrent ? `Update ${person.name}` : 'Create New Profile'}</button>
			</div>
			
		</form>
	)
}

export default Form