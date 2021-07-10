import React from 'react';

import HomeForm from './HomeForm';
import './Home.css';

function Home() {
	return (
		<div className="home-wrap">
			<div className="heading-wrap">
				<h3 className="heading text-center text-uppercase">Join In Room</h3>
			</div>
			<div className="form-wrap">
				<HomeForm />
			</div>
		</div>
	)
}

export default Home;