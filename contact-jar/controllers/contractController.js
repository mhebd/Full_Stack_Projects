const Contact = require('../models/Contact');

/*
* @GET Get all contacts
*/
exports.getContacts = async (req, res) => {
	try {
		const contacts =  await Contact.find({ user : req.userId }).sort({createdAt: -1});

		res.status(200).json({
			contacts,
		});
	} catch(err) {
		res.status(400).json({
			message : 'Something went wrong to get contact.'
		})
	}
}

/*
* @POST Create a contact
*/
exports.createContact = async (req, res) => {
	try {
		const {name, email, phone, type} =  req.body;

		const contact = await Contact.create({
			name,
			email,
			phone,
			type,
			user: req.userId,
		});

		res.status(201).json({
			contact,
		})
	} catch(err) {
			res.status(400).json({
				message : 'Something went wrong to create contact.'
			})
		}
}

/*
* @PUT Update a contact
*/
exports.updateContact = async (req,  res) => {
	try {
		const id =  req.params.id;
		const { name, email, phone, type } = req.body;

		let contactFields = {};

		if(name) contactFields.name = name;
		if(email) contactFields.email = email;
		if(phone) contactFields.phone = phone;
		if(type) contactFields.type = type;

		const isContact = await Contact.findById(id);

		if(!isContact) {
			res.status(404).json({
				message: 'Contact did not found.',
			});
			return;
		};

		if(isContact.user.toString() !== req.userId) {
			res.status(401).json({
				message: 'You are not authorized.',
			});
			return;
		}

		const updateContact = await Contact.findByIdAndUpdate(id, {
			$set : contactFields,
		}, { new : true });

		res.status(200).json({
			updateContact,
		});
	} catch(err) {
		res.status(400).json({
			message : 'Something went wrong to update contact'
		})
	}
}

/*
* @DELETE Delete a contact
*/
exports.deleteContact = async (req, res) => {
	try {
		const id =  req.params.id;

		const isContact = await Contact.findById(id);

		if(!isContact) {
			res.status(404).json({
				message: 'Contact did not fiund.',
			})
			return;
		};

		if(isContact.user.toString() !== req.userId) {
			res.status(401).json({
				message: 'You are not authorized.',
			})
			return;
		}
		
		await Contact.findByIdAndDelete(id);

		res.status(200).json({
			message : 'Contact deleted successfully.'
		})
	} catch (err) {
		res.status(400).json({
			message : 'Something went wrong to delete contact.'
		})
	}
} 

