import React, {useContext} from 'react';
import QuoteContext from '../../context/quote/QuoteContext';

function Quote({quote}) {
	const { deleteQuote, setCurrent } = useContext(QuoteContext);

	return (
		<div className="quote-card mb-3 card bg-danger text-light">
			<div className="card-body">
				<div className="blockquote">
					<p className="lead">{quote.quote}</p>
					<footer className="blockquote-footer text-light">{quote.owner}</footer>
				</div>
			</div>
			<div className="card-footer">
				<div className="btn-group">
					<button className="btn btn-dark" onClick={() => setCurrent(quote)}>Edit Quote</button>
					<button className="btn btn-success" onClick={() => deleteQuote(quote._id)}>Delete Quote</button>
				</div>
			</div>			
		</div>
	)
}

export default Quote