const SupportTicketController = {};
const SupportTicket = require('../models/SupportTicket');
const Client = require('../models/Client');

SupportTicketController.postSupportTicket = async(req, res) => {
    var supportTicket = new SupportTicket();
  
    supportTicket.titleProblem = req.body.titleProblem;
    supportTicket.detailProblem = req.body.detailProblem;
    supportTicket.whoReportProblem = req.body.whoReportProblem;
    const client = await Client.findById(req.body.client);
    supportTicket.client = client;
    supportTicket.state = req.body.state;
  
    if (supportTicket.titleProblem && supportTicket.detailProblem &&  supportTicket.whoReportProblem && supportTicket.client && supportTicket.state) {
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
SupportTicketController.getSupportTickets = async (req, res) => {
    const supportTickets = await SupportTicket.find().populate('Client');
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
    const client = await Client.findById(req.body.client);
    const {titleProblem,detailProblem,whoReportProblem,state}=req.body;
    await SupportTicket.findByIdAndUpdate(req.params.id,{client, titleProblem,detailProblem,whoReportProblem,state});
   res.status(200).json('Support Ticket updated');
  } catch (error) {
    res.json(error);
  }
}

module.exports = SupportTicketController;