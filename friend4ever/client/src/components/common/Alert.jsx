import React, { useState, useContext, useEffect } from 'react';

import AlertContext from '../../context/alert/AlertContext';

function Alert() {
	const [alerts, setAlerts] = useState([]);

	const { alert } = useContext(AlertContext);

	useEffect(() => {
		setAlerts(alert);
		//eslint-disable-next-line
	}, [alert])

	return (
		<>
			<div className="alert-wrap">
				{alerts.map(alert => <div key={alert.id} className={`alert alert-${alert.type}`}>{alert.alert}</div>)}
			</div>
		</>
	)
}

export default Alert