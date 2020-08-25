const {Router}=require('express');
const router=Router();

const {login} = require('../controllers/Session');
router.route('/').post(login);
module.exports=router;