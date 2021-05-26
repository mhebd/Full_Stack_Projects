const Person = require('../models/Person');

/*
* @POST Create a new person.
*/
exports.createPerson = async (req, res) => {
	try {
		const {name, email, phone, age, address, avatar, details, type} = req.body;
		const userId = req.userId;

		if(!req.files) {
			res.status(404).json({
				message: 'Something went wrong to upload file.',
			});
			return;
		}

		const fileName = new Date().getTime() +'-'+ req.files.avatar.name.split(' ').join('-');

		if(req.files) {
			const file = req.files.avatar;

			if(file) {
				let filePath;
				if(process.env.NODE_ENV === 'production') {
					filePath = './client/build/images/person/'+fileName
				} else {
					filePath = './client/public/images/person/'+fileName
				}
				file.mv(filePath,(err) => {
					if(err){
						res.status(404).json({
							message: 'File uploading error.',
						});
					} else {
						console.log('file uploaded successfully')
					}
				})
			}
		};

		const person = await Person.create({
			name,
			email,
			phone,
			avatar: fileName,
			age,
			address,
			details,
			type,
			userId,
		});

		res.status(200).json({
			person,
		})
	} catch(err) {
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
};

/*
* @GET Get all person by user id
*/
exports.getPersons = async (req, res) => {
	try {
		const userId = req.userId;

		const persons = await Person.find({ userId : userId }).sort('-created_at');

		res.status(200).json({
			persons,
		})
	} catch(err) {
		clg
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
};

/*
* @GET Get a person
*/
exports.getPerson = async (req, res) => {
	try {
		const userId = req.userId;
		const id =  req.params.id;

		const person = await Person.findById(id);

		if(!person) {
			res.status(404).json({
				message: 'No perosn found with this ID',
			});
			return;
		}

		if(person.userId.toString() !== userId) {
			res.status(404).json({
				message: 'You are not authorized to get this perosn.',
			});
			return;
		}

		res.status(200).json({
			person,
		})
	} catch(err) {
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
};

/*
* @PUT Update a person
*/
exports.updatePerson = async (req, res) => {
	try {
		const {name, email, phone, age, address, details, type} = req.body;
		const userId = req.userId;
		const id =  req.params.id;

		const hasPerson = await Person.findById(id);

		if(!hasPerson) {
			res.status(404).json({
				message: 'No perosn found with this ID',
			});
			return;
		}

		if(hasPerson.userId.toString() !== userId) {
			res.status(404).json({
				message: 'You are not authorized to update this perosn.',
			});
			return;
		}

		const personFields = {};

		if(name) personFields.name = name;
		if(email) personFields.email = email;
		if(phone) personFields.phone = phone;
		if(age) personFields.age = age;
		if(address) personFields.address = address;
		if(details) personFields.details = details;
		if(type) personFields.type =  type;

		let fileName;
		if(req.files) {
			const file = req.files.avatar;
			fileName =new Date().getTime() +'-'+ file.name.split(' ').join('-');

			if(file) {
				let filePath;
				if(process.env.NODE_ENV === 'production') {
					filePath = './client/build/images/person/'+fileName
				} else {
					filePath = './client/public/images/person/'+fileName
				}
				file.mv(filePath,(err) => {
					if(err){
						console.log(err)
					} else {
						console.log('file uploaded')
					}
				})
			}
		};

		if(fileName) personFields.avatar = fileName;

		const person = await Person.findByIdAndUpdate(id,{ $set: personFields, }, { new : true, })

		res.status(200).json({
			person,
		})
	} catch(err) {
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
};

/*
* @DELETE Delete a person
*/
exports.deletePerson = async (req, res) => {
	try {
		const userId = req.userId;
		const id =  req.params.id;

		const hasPerson = await Person.findById(id);

		if(!hasPerson) {
			res.status(404).json({
				message: 'No perosn found with this ID',
			});
			return;
		}

		if(hasPerson.userId.toString() !== userId) {
			res.status(404).json({
				message: 'You are not authorized to delete this perosn.',
			});
			return;
		}

		await Person.findByIdAndDelete(id);

		res.status(200).json({
			message: 'Person deleted successfully.',
		})
	} catch(err) {
		console.log(err.message);
		res.status(404).json({
			message: err.message,
		})
	}
};