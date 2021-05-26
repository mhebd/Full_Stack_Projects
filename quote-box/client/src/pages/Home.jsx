import React, { useContext, useEffect, Suspense } from 'react';
import QuoteContext from '../context/quote/QuoteContext';
import AuthContext from '../context/auth/AuthContext';

import QuoteForm from '../components/home/QuoteForm';
import Quote from '../components/home/Quote';

function Home() {
	const { quotes, getQuotes } = useContext(QuoteContext);
	const { loadUser } = useContext(AuthContext);

	useEffect(() => {
		getQuotes();
	}, [])
	return (
		<>
			<main className="home-wrap py-5">
				<div className="row">
					<div className="col-lg-8 col-md-10 mx-auto">
						<QuoteForm />
						<Suspense fallback={<p className="lead">loading...</p>}>
							<div className="quote-list-wrap">
								<h3 className="text-center text-danger mb-4">Your Quotes</h3>
								{quotes.map(quote => <Quote quote={quote} key={quote._id} />)}
							</div>
						</Suspense>
					</div>
				</div>
			</main>
		</>
	)
}

export default Home;