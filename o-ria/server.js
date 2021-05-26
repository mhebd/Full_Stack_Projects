const express = require('express');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dataBase = require('./db/dbSetup');
require('dotenv').config({ path : 'config/config.env'});

const userRoutes = require('./routes/userRoutes');
const personRoutes = require('./routes/personRoutes');

const app =  express();

app.use(fileupload());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ extended: false }));

dataBase();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/person',  personRoutes);

if(process.env.NODE_ENV === 'production') {
	console.log('Production environment...')
	app.use(express.static('client/build'));

	app.get('*', (req,  res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html' ))
	});
} else if(process.env.NODE_ENV === 'development') {
	console.log('Developmetn environment...')
	app.get('/', (req, res) => {
		res.send('Hello, Developer...')
	});
}

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}...`);
});