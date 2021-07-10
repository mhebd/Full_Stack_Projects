import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import ProfileContext from '../../context/profile/ProfileContext';


function CreateEducation() {
	const [education, setEducation] = useState({
		school: '', 
		degree: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const { school, degree, from, to, current, description } = education;

	const { setAlert } = useContext(AlertContext);
	const { addEducation, error, success } =  useContext(ProfileContext);

	const onChangeHandler = e => setEducation({...education, [e.target.name] :  e.target.value});
	const onChangeCheckbox = e => setEducation({...education, current: education.current === false ? true : false });

	const onSubmitHandler = e => {
		e.preventDefault();
		
		if(!school || !degree || !from) {
			setAlert('Some text is required.', 'warning');
		} else if(!current && !to) {
			setAlert('Some text is required.', 'warning');
		} else {
			addEducation(education);
		}
	};

	useEffect(() => {
		if(error) setAlert(error);
		if(success) setAlert(success, 'success');
	}, [error, success]);

	return (
		<>
			<form className="form" onSubmit={onSubmitHandler}>
				<div className="form-group mb-4">
					<label htmlFor="school">Your School Name</label>
					<input type="text" name="school" className="form-control" onChange={e => onChangeHandler(e)} value={school} placeholder="Your School Name..." />
				</div>
				<div className="form-group mb-4">
					<label htmlFor="degree">Graduation Title</label>
					<input type="text" name="degree" className="form-control" onChange={e => onChangeHandler(e)} value={degree} placeholder="Graduation Title..." />
				</div>
				<div className="form-group mb-4">
					<label htmlFor="from">Start Date</label>
					<input type="date" name="from" className="form-control" onChange={e => onChangeHandler(e)} value={from} placeholder="Start Date..." />
				</div>
				{current !== true ? <div className="form-group mb-4">
					<label htmlFor="to">End Date</label>
					<input type="date" name="to" className="form-control" onChange={e => onChangeHandler(e)} value={to} placeholder="End Date..." />
				</div> : null}
				<div className="form-group mb-4">
					<input type="checkbox" name="current" className="mr-3" onChange={e => onChangeCheckbox(e)}  />  
					<label htmlFor="current">Currently Read There:</label>
				</div>
				<div className="form-group mb-4">
					<label htmlFor="description">Write A Description:</label>
					<textarea name="description" id="description" cols="30" rows="7" className="form-control" onChange={e => onChangeHandler(e)} value={description} placeholder="Write A Description..." />
				</div>
				<div className="form-group mb-4">
					<button className="ff-btn" type="submit">Add New Experience</button>
				</div>
			</form>
		</>
	)
}

export default CreateEducation