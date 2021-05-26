const Quote = require('../models/Quote');

/*
* @POST Create a new quote  
*/
exports.createQuote = async(req, res) => {
	try {
		const { quote, owner } = req.body;
		const userId = req.userId;

		const newQuote = await Quote.create({
			quote,
			owner,
			userId,
		});

		res.status(201).json({
			newQuote,
		})
	} catch(err) {
		console.log(err.message);
		res.status(500).json({
			message: err.message,
		})
	}
}

/*
* @GET Get all quotes
*/
exports.getQuotes = async(req, res) => {
	try {
		const userId = req.userId;

		const quotes = await Quote.find({
			userId : userId,
		}).sort('-createdAt');

		res.status(200).json({
			quotes,
		})
	} catch(err) {
		console.log(err.message);
		res.status(500).json({
			message: err.message,
		})
	}
}

/*
* @PUT Update an existing quote  
*/
exports.updateQuote = async(req, res) => {
	try {
		const id = req.params.id;
		const userId = req.userId;
		const {quote, owner} =  req.body;
		let quotefields = {};

		if(quote) quotefields.quote =  quote;
		if(owner) quotefields.owner = owner;

		const isQuote = await Quote.findById(id);

		if(!isQuote) {
			res.status(404).json({
				message: `No quote found with this ${id}`,
			});
			return;
		}

		if(isQuote.userId.toString() !== userId) {
			res.status(403).json({
				message : 'You are not authorized to update this quote',
			});
			return;
		}

		const updateQuote = await Quote.findByIdAndUpdate(
			id, 
			{ $set : quotefields, }, 
			{ new : true, }
		)

		res.status(200).json({
			updateQuote,
		})
	} catch(err) {
		console.log(err.message);
		res.status(500).json({
			message: err.message,
		})
	}
}

/*
* @DELETE Delete an existing quote 
*/
exports.deleteQuote = async(req, res) => {
	try {
		const id = req.params.id;
		const userId = req.userId;

		const isQuote = await Quote.findById(id);

		if(!isQuote) {
			res.status(404).json({
				message: `No quote found with this ${id}`,
			});
			return;
		}

		if(isQuote.userId.toString() !== userId) {
			res.status(403).json({
				message : 'You are not authorized to delete this quote',
			});
			return;
		}

		await Quote.findByIdAndDelete(id);

		res.status(200).json({
			message : 'Quote Deleted successfull.',
		})
	} catch(err) {
		console.log(err.message);
		res.status(500).json({
			message: err.message,
		})
	}
}
