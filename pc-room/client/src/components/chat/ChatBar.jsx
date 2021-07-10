import React from 'react';
import { Link } from 'react-router-dom';

function ChatBar({name, avatar, room}) {
	return (
		<div className="chat-bar-wrap card-body">
			<div className="row">
				<div className="col-9 d-flex align-items-center ">
					<img src={avatar} alt={name} className="user-avatar img-fluid" title="Mehedi Hassan" />
					<span className="lead ml-3">{name}</span>
					<span className="mx-2">|</span>
					<span className="lead"> {room}</span>
				</div>
				<div className="col-3 text-right">
					<Link to="/" className="btn text-danger font-weight-bold">X</Link>
				</div>
			</div>
		</div>
	)
}

export default ChatBar