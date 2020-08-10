const ContactController = {};
const Contact = require('../models/Contact');

//get all contacts
ContactController.getContacts = async (req, res) => {
    const contacts = await Contact.find();
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
        const {name,legalCertificate,webSite,address, numberPhone, sector}=req.body;
        await Client.findByIdAndUpdate(req.params.id,{name,legalCertificate,webSite,address, numberPhone, sector});
        res.status(400).json('Client updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = ContactController;