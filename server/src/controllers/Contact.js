const ContactController = {};
const Contact = require('../models/Contact');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
ContactController.contacPost = (req, res) => {
    var contac = new Contact();
  
    contac.firstname = req.body.firstname;
    contac.lastname = req.body.lastname;
    contac.email = req.body.email;
    contac.address = req.body.address;
  
    if (contac.firstname && contac.lastname &&  contac.email && contac.address ) {
      contac.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the student', err)
          res.json({
            error: 'There was an error saving the student'
          });
        }
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:4000/api/contacs/?id=${contac.id}`
        });
        res.json(contac);
      });
    } else {
      res.status(422);
      console.log('error while saving the student')
      res.json({
        error: 'No valid data provided for student'
      });
    }
  };

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
        await contac.findByIdAndUpdate(req.params.id,{name,legalCertificate,webSite,address, numberPhone, sector});
        res.status(400).json('contac updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = ContactController;