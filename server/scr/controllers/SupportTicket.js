const SupportTicketController = {};
const SupportTicket = require('../models/SupportTicket');

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