import React from 'react';
import emoji from 'react-emoji'

function Message({message, name}) {
	name = name.trim().toLowerCase();
	return (
		<div className={`message-wrap mb-3 d-flex ${message.user_name === name ? 'user' : null }`}>
			<img src={message.user_avatar} alt="" className="img-fluid user-avatar" title={message.user_name} />
			<span className="message">{emoji.emojify(message.text)}</span>
		</div>
	)
}

export default Message;