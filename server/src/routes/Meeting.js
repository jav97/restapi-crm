const {Router}=require('express');
 const router=Router();

 const {getMeetings, postMeeting, deleteMeeting, getMeeting, updateMeeting} = require('../controllers/Meeting');
 router.route('/').get(getMeetings).post(postMeeting);
 router.route('/:id').delete(deleteMeeting).get(getMeeting).put(updateMeeting);
 module.exports=router;