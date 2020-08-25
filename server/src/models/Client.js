const {Schema,model}=require('mongoose');

const ClientSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    legalCertificate:{
        type:String,
        required:true,
    },
     webSite:{
         type:String,
         required:true,
     },
     address:{
          type:String,
          required:true
     },
     numberPhone:{
          type:String,
          required:true,
     },
     sector:{
          type:String,
          required:true
     },
});

module.exports=model('Client',ClientSchema);