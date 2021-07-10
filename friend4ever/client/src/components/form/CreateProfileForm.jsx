import React, { useState, useContext, useEffect } from 'react';

import ProfileContext from '../../context/profile/ProfileContext';
import AlertContext from '../../context/alert/AlertContext';

function CreateProfileForm() {
	const [newProfile, setNewProfile] = useState({
		status: '', 
		location: '',
		nickName: '',
		phone: '',
		skills: '',
		bio: '',
		website: '',
		youtube: '',
		facebook: '',
		twitter: '',
		linkedin: '',
		instagram: '',
	});

	const { status, location, nickName, phone, skills, bio, website, facebook, twitter, youtube, linkedin, instagram } = newProfile;

	const { createProfile, myProfile, error, success } = useContext(ProfileContext);
	const { setAlert } = useContext(AlertContext);

	const onChangeHandler = e => setNewProfile({...newProfile, [e.target.name] : e.target.value});

	const onSubmitHandler = e => {
		e.preventDefault();
		if(!status || !location) {
			setAlert('All * marked fields are required.', 'warning');
		} else {
			createProfile(newProfile);
		}
	};

	useEffect(() => {

		if(myProfile) {
			const sklText = String(myProfile.skills);
			setNewProfile({...newProfile, ...myProfile, skills: sklText, ...myProfile.social});
		}
	}, [myProfile]);

	useEffect(() => {
		if(error) setAlert(error);
		if(success) setAlert(success, 'success');
	}, [error, success]);


	return (
		<form action="" className="form" onSubmit={onSubmitHandler}>
			<p className="">Required Fields.</p>
			<div className="form-group mb-3">
				<label htmlFor="status">Your Status :</label>
				<input type="text" name="status" placeholder="Type Your Status... As Like, Student or Job Holder" className="form-control" value={status} onChange={e => onChangeHandler(e)} />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="location">Your Loacation:</label>
				<input type="text" name="location" placeholder="Your Loacation..." className="form-control" value={location} onChange={e => onChangeHandler(e)} />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="nickName">Your Nick Name:</label>
				<input type="text" name="nickName" placeholder="Your Nick Name..." className="form-control" value={nickName} onChange={e => onChangeHandler(e)} />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="phone">Your Phone Number:</label>
				<input type="text" name="phone" placeholder="Your Phone Number..." className="form-control" value={phone} onChange={e => onChangeHandler(e)} />
			</div>
			<div className="form-group mb-3">
				<label htmlFor="skills">Your Special Skills:</label>
				<input type="text" name="skills" placeholder="Your Special Skills... Write With ',' Separately..." className="form-control" value={skills} onChange={e => onChangeHandler(e)} />
			</div>

			<p className="">Optional Fields.</p>
			<div className="form-group mb-3">
				<label htmlFor="website">Your Website Link:</label>
				<div className="input-group">
					<i className="fas fa-globe mt-1 theme-color mr-3 sl"></i>
					<input type="text" name="website" placeholder="https://yourwebsite.com" className="form-control" value={website} onChange={e => onChangeHandler(e)} />
				</div>
			</div>
			<div className="form-group mb-3">
				<label htmlFor="youtube">Your Youtube Link:</label>
				<div className="input-group">
					<i className="fab fa-youtube mt-1 theme-color mr-3 sl"></i>
					<input type="text" name="youtube" placeholder="https://youtube.com/c/chanelName" className="form-control" value={youtube} onChange={e => onChangeHandler(e)} />
				</div>
			</div>
			<div className="form-group mb-3">
				<label htmlFor="facebook">Your Facebook Link:</label>
				<div className="input-group">
					<i className="fab fa-facebook mt-1 theme-color mr-3 sl"></i>
					<input type="text" name="facebook" placeholder="https://facebook.com/userName" className="form-control" value={facebook} onChange={e => onChangeHandler(e)} />
				</div>
			</div>
			<div className="form-group mb-3">
				<label htmlFor="twitter">Your Twitter Link:</label>
				<div className="input-group">
					<i className="fab fa-twitter mt-1 theme-color mr-3 sl"></i>
					<input type="text" name="twitter" placeholder="https://twitter.com/userName" className="form-control" value={twitter} onChange={e => onChangeHandler(e)} />
				</div>
			</div>
			<div className="form-group mb-3">
				<label htmlFor="linkedin">Your LinkedIn Link:</label>
				<div className="input-group">
					<i className="fab fa-linkedin mt-1 theme-color mr-3 sl"></i>
					<input type="text" name="linkedin" placeholder="https://linkedin.com/userName" className="form-control" value={linkedin} onChange={e => onChangeHandler(e)} />
				</div>
			</div>
			<div className="form-group mb-3">
				<label htmlFor="instagram">Your Instagram Link:</label>
				<div className="input-group">
					<i className="fab fa-instagram mt-1 theme-color mr-3 sl"></i>
					<input type="text" name="instagram" placeholder="https://instagram.com/userName" className="form-control" value={instagram} onChange={e => onChangeHandler(e)} />
				</div>
			</div>
			<div className="form-group mb-3">
				<label htmlFor="bio">Write About You:</label>
				<textarea name="bio" cols="30" rows="6" className="form-control" placeholder="Something About You..." value={bio} onChange={e => onChangeHandler(e)} />
			</div>
			<div className="form-gorup">
				<button className="ff-btn">Save Profile</button>
			</div>
		</form>
	)
}

export default CreateProfileForm