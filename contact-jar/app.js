const express = require('express');
const path = require('path');

const userRouter = require('./routes/userRoutes.js');
const contactRouter = require('./routes/contactRoutes.js');
const authRouter = require('./routes/authRoutes.js');

const app = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/contact', contactRouter);
app.use('/api/v1/auth', authRouter);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


module.exports = app;