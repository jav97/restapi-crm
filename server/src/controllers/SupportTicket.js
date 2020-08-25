const SupportTicketController = {};
const SupportTicket = require('../models/SupportTicket');

SupportTicketController.supportTicketPost = (req, res) => {
    var supportTicket = new SupportTicket();
  
    supportTicket.firstname = req.body.firstname;
    supportTicket.lastname = req.body.lastname;
    supportTicket.email = req.body.email;
    supportTicket.address = req.body.address;
  
    if (supportTicket.firstname && supportTicket.lastname &&  supportTicket.email && supportTicket.address ) {
      supportTicket.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the student', err)
          res.json({
            error: 'There was an error saving the student'
          });
        }
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:4000/api/supportTickets/?id=${supportTicket.id}`
        });
        res.json(supportTicket);
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
SupportTicketController.getSupportTicket = async (req, res) => {
    const supportTickets = await SupportTicket.find();
    res.status(200).json(supportTickets);
}

//get only one contacts
SupportTicketController.getSupportTicket = async (req, res) => {
    try {
        const supportTicket = await SupportTicket.findById(req.params.id);
        res.status(200).json(supportTicket);
    } catch (error) {
        res.json(error);
    }
}

//delete contacts of database
SupportTicketController.deleteSupportTicket = async (req, res) => {
    try {
         await SupportTicket.findByIdAndDelete(req.params.id);
         res.json('Contact is Deleted');
    } catch (error) {
        res.json(error);
    }
}

//update date of some contact
SupportTicketController.updateSupportTicket = async (req, res) => {
      try {
        const {name,legalCertificate,webSite,address, numberPhone, sector}=req.body;
        await SupportTicket.findByIdAndUpdate(req.params.id,{name,legalCertificate,webSite,address, numberPhone, sector});
        res.status(400).json('Support Ticket updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = SupportTicketController;