const MeetingController = {};
const Meeting = require('../models/Meeting');

MeetingController.meetingPost = (req, res) => {
    var meeting = new Meeting();
  
    meeting.firstname = req.body.firstname;
    meeting.lastname = req.body.lastname;
    meeting.email = req.body.email;
    meeting.address = req.body.address;
  
    if (meeting.firstname && meeting.lastname &&  meeting.email && meeting.address ) {
      meeting.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the student', err)
          res.json({
            error: 'There was an error saving the student'
          });
        }
        res.status(201);//CREATED
        res.header({
          'location': `http://localhost:4000/api/meetings/?id=${meeting.id}`
        });
        res.json(meeting);
      });
    } else {
      res.status(422);
      console.log('error while saving the student')
      res.json({
        error: 'No valid data provided for student'
      });
    }
  };


//get all meetings
MeetingController.getMeetings = async (req, res) => {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
}

//get only one meetings
MeetingController.getMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        res.status(200).json(meeting);
    } catch (error) {
        res.json(error);
    }
}

//delete meetings of database
MeetingController.deleteMeeting = async (req, res) => {
    try {
         await Meeting.findByIdAndDelete(req.params.id);
         res.json('Meeting is Deleted');
    } catch (error) {
        res.json(error);
    }
}

//update date of some contact
MeetingController.updateMeeting = async (req, res) => {
      try {
        const {title, date, user, isVirtual, client}=req.body;
        await Meeting.findByIdAndUpdate(req.params.id,{title, date, user, isVirtual, client});
        res.status(400).json('Meeting updated');
      } catch (error) {
           res.json(error);
      }
}

module.exports = MeetingController;