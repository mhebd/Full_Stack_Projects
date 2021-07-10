import React, { useState, useEffect } from 'react'

function ChatForm({message, setMessage, sendMessage}) {

	return (
		<div className="chat-form-wrap card-body">
			<form className="form" onSubmit={e => sendMessage(e)}>
				<div className="input-group">
					<input type="text" name="text" value={message} className="form-control msg-input" onChange={e => setMessage(e.target.value)} placeholder="messages..." autoComplete="false" />
					<div className="input-group-prepend">
						<button className="btn msg-btn" type="submit">
							<i className="far fa-paper-plane"></i>
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ChatForm