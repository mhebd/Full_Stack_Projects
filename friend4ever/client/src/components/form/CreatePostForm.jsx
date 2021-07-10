import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import PostContext from '../../context/post/PostContext';

function CreatePostForm() {
	const [text, setText] = useState({
		post: '',
	});

	const { post } = text;

	const { setAlert } = useContext(AlertContext);
	const { createPost } =  useContext(PostContext);

	const onChangeHandler = e => setText({[e.target.name] :  e.target.value});

	const onSubmitHandler = e => {
		e.preventDefault();
		
		if(!post) {
			setAlert('Some text is required.', 'warning');
		} else {
			const repTextObj = {
				...text,
				post: text.post.split('\n').map(p => p !== '' ? `<p>${p}</p>` : '').join(''),
			};
			createPost(repTextObj);
			setText({
				post: '',
			});
		}
	};

	return (
		<>
			<form className="form" onSubmit={onSubmitHandler}>
				<div className="form-group mb-4">
					<textarea name="post" id="post" cols="30" rows="7" className="form-control" wrap="hard" onChange={e => onChangeHandler(e)} value={text.post} placeholder="Publish A New Post..." />
				</div>
				<div className="form-group mb-4">
					<button className="ff-btn" type="submit">Publish New Post</button>
				</div>
			</form>
		</>
	)
}

export default CreatePostForm