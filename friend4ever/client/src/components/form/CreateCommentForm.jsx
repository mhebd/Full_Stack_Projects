import React, { useState, useContext } from 'react';

import AlertContext from '../../context/alert/AlertContext';
import PostContext from '../../context/post/PostContext';

function CreateCommentForm({postId}) {
	const [text, setText] = useState({
		comment: '',
	});

	const { comment } = text;

	const { setAlert } = useContext(AlertContext);
	const { createComment } =  useContext(PostContext);

	const onChangeHandler = e => setText({[e.target.name] :  e.target.value});

	const onSubmitHandler = e => {
		e.preventDefault();
		
		if(!comment) {
			setAlert('Some text is required.', 'warning');
		} else {
			createComment(text, postId);
			setText({
				comment: '',
			})
		}
	};

	return (
		<>
			<form className="form" onSubmit={onSubmitHandler}>
				<div className="form-group mb-4">
					<textarea name="comment" id="comment" cols="30" rows="7" className="form-control" onChange={e => onChangeHandler(e)} value={text.comment} placeholder="Add A New Comment..." />
				</div>
				<div className="form-group mb-4">
					<button className="ff-btn" type="submit">Comment</button>
				</div>
			</form>
		</>
	)
}

export default CreateCommentForm