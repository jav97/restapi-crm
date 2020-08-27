const {Router}=require('express');
const router=Router();

const{postUser,getUsers,getUser,deleteUser,updateUser}=require('../controllers/User');

router.route('/').get(getUsers).post(postUser);
router.route('/:id').delete(deleteUser).get(getUser).put(updateUser);
module.exports=router;