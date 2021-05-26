const mongoose =  require('mongoose');

module.exports = async () => {
	const config = {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	};

	const conString = 'mongodb+srv://mehedi:eiVnTJWDxQNOpUXD@portfolios.s9uuh.mongodb.net/quotedb?retryWrites=true&w=majority';

	try{
		const res = await mongoose.connect(conString, config);
		if(res) {
			console.log(`DB Connection Stablished...`)
		}
	} catch(err) {
		console.log(err.message)
	}
}