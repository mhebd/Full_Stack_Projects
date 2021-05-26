import React from 'react'

function Notfound() {
	return (
		<div className="text-center">
			<div className="display-1 text-danger">Opps!</div>
			<div className="display-4 mb-3">Something went wrong.</div>
			<a href="/" className="lead text-light">Go Back To Home.</a>
		</div>
	)
}

export default Notfound