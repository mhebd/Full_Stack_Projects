import React, {useReducer} from 'react';
import QuoteContext from './QuoteContext';
import QuoteReducer from './QuoteReducer';
import axios from 'axios';

function QuoteState(props) {
	const initialState = {
		quotes: [],
		current: null,
		error: [],
	};

	const [state, dispatch] = useReducer(QuoteReducer, initialState);

	//Create a new quote
	const createQuote = async newQuote => {
		try {
			const res = await axios.post('/api/v1/quotes', newQuote, {
				headers: {
					'content-type': 'application/json',
				}
			});
			getQuotes();
		} catch (err) {
			console.log(err.response.data)
			dispatch({
				type: 'error',
				payload: err.response.data.message,
			});
			setTimeout(() => {
				dispatch({
					type: 'removeErr',
				})
			}, 5000)
		}
	}

	//Update existing quote
	const updateQuote = async ({id, quote, owner}) => {
		try {
			const res = await axios.put(`/api/v1/quotes/${id}`, {
				quote,
				owner,
			}, {
				headers: {
					'content-type': 'application/json',
				}
			});
			getQuotes();
			removeCurrent();
		} catch (err) {
			console.log(err.response.data)
			dispatch({
				type: 'error',
				payload: err.response.data.message,
			});
			setTimeout(() => {
				dispatch({
					type: 'removeErr',
				})
			}, 5000)
		}
	}

	//Get all quotes
	const getQuotes = async () => {
		try {
			const res = await axios.get('/api/v1/quotes', {
				headers: {
					'content-type': 'application/json',
				}
			});
			dispatch({
				type: 'getQuotes',
				payload: res.data,
			})
		} catch (err) {
			dispatch({
				type: 'error',
				payload: err.response.data.message,
			});
			setTimeout(() => {
				dispatch({
					type: 'removeErr',
				})
			}, 5000)
		}
	}

	//Delete a quotes
	const deleteQuote = async (id) => {
		try {
			const res = await axios.delete(`/api/v1/quotes/${id}`, {
				headers: {
					'content-type': 'application/json',
				}
			});
			getQuotes();
		} catch (err) {
			console.log(err.response.data)
			dispatch({
				type: 'error',
				payload: err.response.data.message,
			});
			setTimeout(() => {
				dispatch({
					type: 'removeErr',
				})
			}, 5000)
		}
	};

	const setCurrent = quote => {
		dispatch({
			type: 'setCurrent',
			payload: quote,
		})
	};

	const removeCurrent = () =>{
		dispatch({
			type: 'removeCurrent',
		})
	}

	return (
		<QuoteContext.Provider value={{
			...state,
			createQuote,
			getQuotes,
			deleteQuote,
			setCurrent,
			updateQuote,
		}} >
			{props.children}
		</QuoteContext.Provider>
	)
}

export default QuoteState