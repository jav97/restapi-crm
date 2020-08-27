const ContactController = {};
const Contact = require('../models/Contact');
const Client = require('../models/Client');


ContactController.postContact = async (req, res) => {
    var contact = new Contact();

    const client = await Client.findById(req.body.client);
    contact.client =client;
    contact.name = req.body.name;
    contact.lastname = req.body.lastname;
    contact.email = req.body.email;
    contact.numberPhone = req.body.numberPhone;
    contact.position = req.body.position;
  
    if (contact.client && contact.name && contact.lastname &&  contact.email && contact.numberPhone && contact.position) {
      contact.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the contact', err)
          res.json({
            error: 'There was an error saving the contact'
          });
        }
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:4000/api/contacts/?id=${contact.id}`
        });
        res.json(contact);
      });
    } else {
      res.status(422);
      console.log('error while saving the contact')
      res.json({
        error: 'No valid data provided for contact'
      });
    }
  };

//get all contacts
ContactController.getContacts = async (req, res) => {
    const contacts = await Contact.find().populate('Client');
    res.status(200).json(contacts);
}

//get only one contacts
ContactController.getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        res.status(200).json(contact);
    } catch (error) {
        res.json(error);
    }
}

//delete contacts of database
ContactController.deleteContact = async (req, res) => {
    try {
         await Contact.findByIdAndDelete(req.params.id);
         res.json('Contact is Deleted');
    } catch (error) {
        res.json(error);
    }
}

//update date of some contact
ContactController.updateContact = async (req, res) => {
      try {
        const {client, name,lastname,email,address, numberPhone, position}=req.body;
        await contact.findByIdAndUpdate(req.params.id,{client, name,lastname,email,address, numberPhone, position});
        res.status(400).json('contact updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = ContactController;