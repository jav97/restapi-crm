const express = require('express');
const cors = require('cors');
const {ckeckAuth}=require('./controllers/Session');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares 
app.use(cors());
app.use(express.json());

// routes
 app.use('/api/users',ckeckAuth, require('./routes/User'));
 app.use('/api/clients',ckeckAuth,require('./routes/Client'));
module.exports = app;