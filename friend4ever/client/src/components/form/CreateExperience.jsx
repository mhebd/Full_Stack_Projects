import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import ProfileContext from '../../context/profile/ProfileContext';

function CreateExperience() {
	const [experience, setExperience] = useState({
		title: '', 
		company: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const { title, company, from, to, current, description } = experience;

	const { setAlert } = useContext(AlertContext);
	const { addExperience, error, success } =  useContext(ProfileContext);

	const onChangeHandler = e => setExperience({...experience, [e.target.name] :  e.target.value});
	const onChangeCheckbox = e => setExperience({...experience, current: experience.current === false ? true : false });

	const onSubmitHandler = e => {
		e.preventDefault();
		
		if(!title || !company || !from) {
			setAlert('Some text is required.', 'warning');
		} else if(!current && !to) {
			setAlert('Some text is required.', 'warning');
		} else {
			addExperience(experience);
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
					<label htmlFor="title">Your Job Title</label>
					<input type="text" name="title" className="form-control" onChange={e => onChangeHandler(e)} value={title} placeholder="Your Job Title..." />
				</div>
				<div className="form-group mb-4">
					<label htmlFor="company">Company Name</label>
					<input type="text" name="company" className="form-control" onChange={e => onChangeHandler(e)} value={company} placeholder="Company Name..." />
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
					<label htmlFor="current">Currently Worked There:</label>
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

export default CreateExperience