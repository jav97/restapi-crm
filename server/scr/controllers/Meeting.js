const MeetingController = {};
const Meeting = require('../models/Meeting');

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