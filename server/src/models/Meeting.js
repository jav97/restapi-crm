const {Schema,model}=require('mongoose');
const Client = require('./Client');
const User = require('./User');

const MeetingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
     user:{
         type:User,
         required:true,
     },
     isVirtual:{
          boolean:false,
          required:true
     },
     client:{
          type:Client,
          required:true,
     },
});

module.exports=model('Meeting',MeetingSchema);