import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../context/alert/AlertContext';

function Alert() {
	const { alerts } = useContext(AlertContext);
	const [alert, setAlert] = useState([]);

	useEffect(() => {
		setAlert(alerts)
	}, [alerts]);

	return (
		<div className="alert-wrap row">
			<div className="col-md-8 mx-auto">
				{alert.map(alert => <div key={alert.id} className={`alert alert-${alert.type}`}>{alert.msg}</div>)}
			</div>
		</div>
	)
}

export default Alert