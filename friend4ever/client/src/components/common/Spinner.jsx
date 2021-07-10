import React from 'react';
import spinner from '../../images/spinner.gif';

function Spinner() {
	return (
		<div className="d-flex w-100 justify-content-center">
			<img src={spinner} alt="loading..." className="img-fluid" />
		</div>
	)
}

export default Spinner