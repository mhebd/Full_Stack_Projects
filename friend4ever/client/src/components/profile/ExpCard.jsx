import React from 'react'

function ExpCard({exp}) {
	return (
		<div className="card mb-3">
			<div className="card-body">
				<h5 className="exp-title">{exp.title}</h5>
				<p className="exp-comp lead">{exp.company}</p>
				<p className="exp-date">{new Date(exp.from).toDateString()} - {exp.current ? 'Present' : new Date(exp.to).toDateString()}</p>
				{exp.description !== '' ? <p className="exp-desc">{exp.description}</p> : null}
			</div>
		</div>
	)
}

export default ExpCard