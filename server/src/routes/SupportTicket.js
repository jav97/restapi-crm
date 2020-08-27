const {Router}=require('express');
 const router=Router();

 const {getSupportTickets, postSupportTicket, deleteSupportTicket, getSupportTicket, updateSupportTicket} = require('../controllers/SupportTicket');
 router.route('/').post(postSupportTicket).get(getSupportTickets);
 router.route('/:id').delete(deleteSupportTicket).get(getSupportTicket).put(updateSupportTicket);
 module.exports=router;