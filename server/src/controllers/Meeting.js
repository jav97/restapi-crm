const MeetingController = {};
const Meeting = require('../models/Meeting');
const Client = require('../models/Client');
const User = require('../models/User');

MeetingController.postMeeting = async(req, res) => {
    var meeting = new Meeting();

    meeting.title = req.body.title;
    meeting.date = req.body.date;
    meeting.hour = req.body.hour;
    const user = await User.findById(req.body.user);
    meeting.user = user;
    meeting.isVirtual = req.body.isVirtual;
    const client = await Client.findById(req.body.client);
    meeting.client = client;
  
    if (meeting.title && meeting.date &&  meeting.hour && meeting.user && meeting.isVirtual && meeting.client ) {
      meeting.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the meeting', err)
          res.json({
            error: 'There was an error saving the meeting'
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
      console.log('error while saving the meeting')
      res.json({
        error: 'No valid data provided for meeting'
      });
    }
  };


//get all meetings
MeetingController.getMeetings = async (req, res) => {
    const meetings = await Meeting.find().populate('Client','User');
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