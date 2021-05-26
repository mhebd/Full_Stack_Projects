const express = require('express');
const morgan =  require('morgan');
const cors =  require('cors');
const path =  require('path');

//All routes implements
const userRoutes = require('./routes/userRoutes');
const quoteRoutes = require('./routes/quoteRoutes');

const app = express();

app.use(morgan('dev'));
app.use(cors())

app.use(express.json());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/quotes',  quoteRoutes);

if(process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) );
}


module.exports = app;