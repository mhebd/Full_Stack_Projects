import React, { useContext, useState } from 'react';
import ContactContex from '../../context/contact/ContactContext.js';

export default function Filter() {
	const { filterContact } = useContext(ContactContex);

	const [text, setText] = useState({
		text : '',
	});

	const onChangeHandler = e => {
		setText({...text, [e.target.name] :  e.target.value }); 
		filterContact(text.text);
	}
	return (
		<form className="form mb-3">
			<div className="form-group">
				<input type="text" name="text" placeholder="Filter Contact..." className="form-control" value={text.text} onChange={(e) => onChangeHandler(e)} />
			</div>
		</form>
	)
}