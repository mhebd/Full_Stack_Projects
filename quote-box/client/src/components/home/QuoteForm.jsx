import React, {useState, useEffect, useContext} from 'react'

import AlertContext from '../../context/alert/AlertContext';
import QuoteContext from '../../context/quote/QuoteContext';

function QuoteForm() {
	const { setAlert } = useContext(AlertContext);
	const { createQuote, current, updateQuote } = useContext(QuoteContext);

	const [newQuote, setNewQuote] = useState({
		quote: '',
		owner: '',
	});
	const {quote, owner} = newQuote;

	useEffect(() => {
		if(current) {
			setNewQuote(current);
		} else {
			setNewQuote({
				quote: '',
				owner: '',
			})
		}
	}, [current])

	const onChange = e => setNewQuote({
		...newQuote,
		[e.target.name] : e.target.value,
	});

	const submited = e => {
		e.preventDefault();
		if(!quote || !owner) {
			setAlert('Write a quote and owner name')
		} else if(quote.length <= 10) {
			setAlert('Quote must be at least 10 characters long')
		} else {
			if(current) {
				updateQuote({
					id: current._id,
					quote,
					owner,
				});
				setAlert('The quote is updated successfully.', 'info')
			} else {
				createQuote({
					quote,
					owner,
				});
				setNewQuote({
					quote: '',
					owner: '',
				});
				setAlert('A new quote is created.', 'info')
			}
		}
	}

	return (
		<div className="form-wrap mb-5">
			<h3 className="text-center text-danger mb-4">{current ? 'Update Quote' : 'Write A New Quote'}</h3>
			<form className="form" onSubmit={submited}> 
				<div className="form-group mb-3">
					<textarea name="quote" cols="30" rows="5" className="form-control" placeholder="Write a new quote..." value={quote} onChange={(e) => onChange(e)} />
				</div>
				<div className="form-group mb-3">
					<input type="text" name="owner" className="form-control" placeholder="Quote owner name" value={owner} onChange={(e) => onChange(e)} />
				</div>
				<div className="form-group mb-3">
					<button type="submit" className="btn btn-danger btn-block">{current ? 'Update Quote' : 'Store Quote'}</button>
				</div>
			</form>
		</div>	
	)
}

export default QuoteForm