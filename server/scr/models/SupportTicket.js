const {Schema,model}=require('mongoose');
const Client = require('./Client');

const SupportTicketSchema=new Schema({
    titleProblem:{
        type:String,
        required:true
    },
    detailProblem:{
        type:String,
        required:true,
    },
     whoReportProblem:{
         type:String,
         required:true,
     },
     client:{
          type:Client,
          required:true
     },
     state:{
          type:String,
          required:true,
     },
});

module.exports=model('SupportTicket',SupportTicketSchema);