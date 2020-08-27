const {Router}=require('express');
 const router=Router();

 const {getClients, postClient} = require('../controllers/Client');
 router.route('/').get(getClients).post(postClient);
 module.exports=router;