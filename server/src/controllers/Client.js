const ClientController = {};
const Client = require('../models/Client');


ClientController.clientPost = (req, res) => {
    var client = new Client();
  
    client.firstname = req.body.firstname;
    client.lastname = req.body.lastname;
    client.email = req.body.email;
    client.address = req.body.address;
  
    if (client.firstname && client.lastname &&  client.email && client.address ) {
      client.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the student', err)
          res.json({
            error: 'There was an error saving the student'
          });
        }
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:4000/api/clients/?id=${client.id}`
        });
        res.json(client);
      });
    } else {
      res.status(422);
      console.log('error while saving the student')
      res.json({
        error: 'No valid data provided for student'
      });
    }
  };

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