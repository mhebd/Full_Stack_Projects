const mongoose =  require('mongoose');

module.exports = () => {
	const conString = process.env.CON_STRING.replace('{&PASSWORD&}', process.env.PASSWORD);

	const monConfig = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	};

	mongoose.connect(conString, monConfig)
		.then((doc) => console.log(`DB Connection Stablished...`))
		.catch((err) => console.log(err));
};