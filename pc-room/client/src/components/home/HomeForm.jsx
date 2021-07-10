import React, { useState } from 'react';

function HomeForm() {

	const [info, setInfo] = useState({
		name: '',
		email: '',
		room: '',
	});

	const { name, email, room } = info;

	const onChangeHandler = e => setInfo({ ...info, [e.target.name] : e.target.value });

	const submitHandler = e => {
		if(!name || !email || !room) {
			e.preventDefault();
			alert('All the fields are required.')
		} else if(name.length < 3) {
			e.preventDefault();
			alert('Name must be at least 3 characters long.')
		} else if(room.length < 3) {
			e.preventDefault();
			alert('Room name must be at least 3 characters long.');
		};
	}

	return (
		<form action="/chat" className="form" onSubmit={e => submitHandler(e)} >
			<div className="input-group mb-3">
				<input type="text" name="name" value={name}  className="form-control" placeholder="Your Name" onChange={e => onChangeHandler(e)} />
			</div>
			<div className="input-group mb-3">
				<input type="email" name="email" value={email}  className="form-control" placeholder="Your Valid Email" onChange={e => onChangeHandler(e)} />
			</div>
			<div className="input-group mb-3">
				<input type="text" name="room" value={room}  className="form-control" placeholder="Your Room" onChange={e => onChangeHandler(e)} />
			</div>
			<div className="input-group mb-3">
				<button className="btn btn-light btn-block" type="submit">Join Now</button>
			</div>
		</form>
	)
}

export default HomeForm;