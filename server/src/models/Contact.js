const {Schema,model}=require('mongoose');
const Client = require('./Client');

const ContactSchema=new Schema({

    client:{
        type: Client.schema,
        require:true
    },
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true,
    },
     email:{
         type:String,
         required:true,
     },
     numberPhone:{
          type:String,
          required:true
     },
     position:{
          type:String,
          required:true,
     },
});

module.exports=model('Contact',ContactSchema);