const mongoose=require("mongoose");
const URL=process.env.MONGOOSE_URI?process.env.MONGOOSE_URI:'mongodb://127.0.0.1:27017/crm';
const  options={ useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true, useFindAndModify: false};
const connection = mongoose.connection;
mongoose.connect(URL,options);
connection.once('open', () => {
console.log('Database is connected');
});