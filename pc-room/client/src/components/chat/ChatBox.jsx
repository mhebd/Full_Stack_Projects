import React from 'react';
import { css } from '@emotion/css';
import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message';

const ROOT_CSS = css({
	height: 400,
})

function ChatBox({messages, name}) {
	return (
		<div className="card-body">
			<ScrollToBottom className={`message-container ${ROOT_CSS}`} >
				{messages.map((message, i) => <Message key={i} message={message} name={name} />)}
			</ScrollToBottom>
		</div>
	)
}

export default ChatBox