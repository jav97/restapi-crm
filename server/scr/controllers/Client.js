const ClientController = {};
const Client = require('../models/Client');

//get all clients
ClientController.getClients = async (req, res) => {
    const clients = await Client.find();
    res.status(200).json(clients);
}

//get only one client
ClientController.getClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        res.status(200).json(client);
    } catch (error) {
        res.json(error);
    }
}

//delete client of database
ClientController.deleteClient = async (req, res) => {
    try {
         await Client.findByIdAndDelete(req.params.id);
         res.json('Client is Deleted');
    } catch (error) {
        res.json(error);
    }
}

//update date of some client
ClientController.updateClient = async (req, res) => {
      try {
        const {name,legalCertificate,webSite,address, numberPhone, sector}=req.body;
        await Client.findByIdAndUpdate(req.params.id,{name,legalCertificate,webSite,address, numberPhone, sector});
        res.status(400).json('Client updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = ClientController;