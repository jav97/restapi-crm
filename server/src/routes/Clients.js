const {Router}=require('express');
 const router=Router();

 const {getClients} = require('../controllers/Client');
 router.route('/').get(getClients);
 module.exports=router;