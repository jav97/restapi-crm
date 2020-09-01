const ClientController = {};
const Client = require('../models/Client');


ClientController.postClient = (req, res) => {
    var client = new Client();  
    
    const {name,legalCertificate,webSite,address,numberPhone,sector}=req.body;
    client.name = name;
    client.legalCertificate = legalCertificate;
    client.webSite = webSite;
    client.address = address;
    client.numberPhone = numberPhone;
    client.sector = sector;
  
    if (client.name && client.legalCertificate &&  client.webSite && client.numberPhone && client.sector) {
      client.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the client', err)
          res.json({
            error: 'There was an error saving the client'
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
      console.log('error while saving the client')
      res.json({
        error: 'No valid data provided for client'
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
};

//update date of some client
ClientController.updateClient = async (req, res) => {
      try {
        const {name,legalCertificate,webSite,address, numberPhone, sector}=req.body;
        await Client.findByIdAndUpdate(req.params.id,{name,legalCertificate,webSite,address, numberPhone, sector});
        res.status(200).json('Client updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = ClientController;