const express = require('express');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const socketio = require('socket.io');
const { addUser, removeUser, getUser, getUserInRoom } = require('./users');

const app = express();

app.use(cors());
app.use(morgan('dev'));

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {
	const admin_avatar = 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png';
	
	socket.on('join', ({name, avatar, room}, callback) => {
		const { error, user } = addUser({id: socket.id, name, avatar, room});

		if(error) return callback(error);

		socket.emit('message', {
			user_name: 'Admin',
			user_avatar: admin_avatar,
			text: `${user.name} welcome to the ${user.room} room.`
		});

		socket.broadcast.to(user.room).emit('message', {
			user_name: 'Admin',
			user_avatar: admin_avatar,
			text: `${user.name} has joined now.`
		})

		socket.join(user.room);

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit('message', {
			user_name: user.name,
			user_avatar: user.avatar,
			text: message,
		});

		callback();
	})

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);

		if(user) {
			io.to(user.room).emit('message', {
				user_name: 'Admin',
				user_avatar: admin_avatar,
				text: `${user.name} has left the room.`
			})
		}
	})
})

app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
})

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));