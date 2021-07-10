import React from 'react'

function EduCard({edu}) {
	return (
		<div className="card mb-3">
			<div className="card-body">
				<h5 className="edu-school">{edu.school}</h5>
				<p className="exp-degree lead">{edu.degree}</p>
				<p className="edu-date">{new Date(edu.from).toDateString()} - {edu.current ? 'Present' : new Date(edu.to).toDateString()}</p>
				{edu.description !== '' ? <p className="edu-desc">{edu.description}</p> : null}
			</div>
		</div>
	)
}

export default EduCard