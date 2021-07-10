import React from 'react';
import { Link } from 'react-router-dom';

import brandImg from '../../images/ancore.png';

function Footer() {
	return (
		<>
			<hr/> 
			<div className="footer-wrap mt-5">
				<div className="container py-3">
					<p className="lead text-center">
						<Link to="/">
							<img src={brandImg} alt="" className="img-fluid brand-img" />
						</Link> &copy; {new Date().getFullYear()} || Developed By: <a className="theme-color" href="https://mhebd.github.io/m-hassan">Mehedi Hassan</a>
					</p>
				</div>
			</div>
		</>
	)
}

export default Footer