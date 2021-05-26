const mongoose = require('mongoose');

exports.initialDB = () => {
	const mongConString = process.env.DB_CON_STRING.replace('{&PASSWORD&}', process.env.DB_PASSWORD);

	const mongooseConfig = {
		useNewUrlParser : true,
		useCreateIndex : true,
		useFindAndModify : false,
		useUnifiedTopology : true,
	}

	mongoose.connect(mongConString, mongooseConfig)
	.then(doc => console.log(`DB Connection Stablished...`))
	.then(err => err ? console.log(err.message) : null )
}

