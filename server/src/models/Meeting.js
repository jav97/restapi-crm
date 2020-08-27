const {Schema,model}=require('mongoose');
const Client = require('./Client');
const User = require('./User');

const MeetingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    hour:{
        type:String,
        required:true
    },
    user : { 
        type : Schema.Types.Array, 
        ref : 'user' 
    },
     isVirtual:{
          type:Boolean,
          required:true
     },
     client : { 
        type : Schema.Types.Array, 
        ref : 'client' 
    },
});

module.exports=model('Meeting',MeetingSchema);