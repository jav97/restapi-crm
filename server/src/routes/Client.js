const {Router}=require('express');
 const router=Router();

 const {getClients, postClient,deleteClient,getClient,updateClient} = require('../controllers/Client');
 router.route('/').get(getClients).post(postClient);
 router.route('/:id').delete(deleteClient).get(getClient).put(updateClient);
 module.exports=router;