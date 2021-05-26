import React, {useContext} from 'react';
import AlertContext from '../context/alert/AlertContext';

function Alert() {
	const { alert } = useContext(AlertContext);
	return (
		<>
			{alert.length > 0 && <div className="container pt-4">
				{
					alert.map(alt => <div key={alt.id} className={`alert alert-${alt.type} mb-3`} ><i className="fas fa-info-circle"></i> {alt.message}</div> )
				}
			</div>}
		</>
	)
}

export default Alert