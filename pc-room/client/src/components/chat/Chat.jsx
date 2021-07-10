import React, { useState, useEffect } from 'react';
import gravatar from 'gravatar';
import queryStr from 'query-string';
import io from 'socket.io-client';

import ChatBar from './ChatBar';
import ChatBox from './ChatBox';
import ChatForm from './ChatForm';
import './Chat.css';

let socket;

const Chat = ({ location }) => {

	const {name, email, room} = queryStr.parse(location.search);

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);

	const avatar = gravatar.url(email, {
		s: '100',
		r: 'x',
		d: 'retro'
	}, true);

	const ENDPOINT = 'https://pc-room.herokuapp.com';

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.emit('join', { name, avatar, room }, (error) => {
			if(error) alert(error);
		});

		return () => {
			socket.emit('disconnect');
			socket.off();
		}
	}, [location.search, name]);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages([...messages, message]);
		})
	}, [messages]);

	const sendMessage = e => {
		e.preventDefault();
		if(message) { 
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	}

	return (
		<div className="chat-wrap card text-dark">
			<ChatBar name={name} avatar={avatar} room={room} />
			<ChatBox messages={messages} name={name} />
			<ChatForm message={message} setMessage={setMessage} sendMessage={sendMessage} />
		</div>
	)
}

export default Chat