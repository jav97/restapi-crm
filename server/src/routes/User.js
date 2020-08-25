const {Router}=require('express');
const router=Router();

const{getUsers,getUser,deleteUser,updateUser}=require('../controllers/User');

router.route('/').get(getUsers);
router.route('/:id').delete(deleteUser).get(getUser).put(updateUser);

module.exports=router;