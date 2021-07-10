import React from 'react'

function NotFound() {
	return (
		<div className="container py-5 text-center">
			<div className="display-1 text-danger">Opps!</div>
			<div className="display-4 text-secondary">Something Went Wrong</div>
			<p className="lead pt-5"><i className="fas fa-arrow-left"></i> Go Back To <a href="">Home</a></p>
		</div>
	)
}

export default NotFound