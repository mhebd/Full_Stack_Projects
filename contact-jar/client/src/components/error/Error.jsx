import React, {useContext} from 'react';
import ErrorContext from '../../context/error/ErrorContext';

function Error() {
	const { alerts } = useContext(ErrorContext);
	return (
		alerts.length > 0 && alerts.map(alert => 
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				{alert.message}
			</div>
		)
	)
}

export default Error