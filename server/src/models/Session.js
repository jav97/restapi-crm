const { Schema, model } = require('mongoose');

const SessionSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type:String,
            required:true
         },
         token:{
            type:String,
            required:true
         },
         created_at:{
              type:Date,
              required:true
         },
         expire_in:{
             type:Number,
             required:true,
         },
         user_id:{
              type:String,
              required:true
         }
    }
);
module.exports=model('Session',SessionSchema);