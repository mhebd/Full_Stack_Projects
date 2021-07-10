//->Initial all dependencies...
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dataBase = require('./db/dbSetup');
const error = require('./middleware/error');
require('dotenv').config({ path : 'config/config.env'});

//Include all required file...
const userRouter = require('./routes/userRoutes');
const profileRouter = require('./routes/profileRoutes');
const postRouter = require('./routes/postRoutes');

//->Create server...
const app =  express();

//->Use some middleware...
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ extended: false }));

//->Database initialization...
dataBase();

//->Create new api link...
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/post', postRouter);

//Handle all Error by middleware 
app.use(error);

//->Show UI...
if(process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req,  res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
	});
} else if(process.env.NODE_ENV === 'development') {
	app.get('/', (req, res) => {
		res.send('Hello, Developer...')
	});
}


//->Active server with a specific port...
const PORT = process.env.PORT || 4400;
app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}...`);
});