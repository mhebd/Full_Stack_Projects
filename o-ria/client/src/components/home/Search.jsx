import React, { useContext, useState } from 'react';

import PersonContext from '../../context/person/PersonContext';

function Search() {
	const [text, setText] = useState('');
	const { setFilter } = useContext(PersonContext);

	const onChange = e =>  {
		setText(e.target.value);
		setFilter(e.target.value);
	}

	return (
		<div className="search-wrap mb-4">
			<input type="text" name="text" placeholder="Filter Person Profile..." value={text} className="form-control" onChange={onChange} />
		</div>
	)
}

export default Search