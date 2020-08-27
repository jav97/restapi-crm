const {Router}=require('express');
const router=Router();

const {postContact,getContact,getContacts,deleteContact,updateContact} = require('../controllers/Contact');
router.route('/').post(postContact).get(getContacts);
router.route('/:id').delete(deleteContact).get(getContact).put(updateContact);
module.exports=router;