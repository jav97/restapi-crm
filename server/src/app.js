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
app.use('/api/users', require('./routes/User'));
app.use('/api/clients', ckeckAuth, require('./routes/Client'));
app.use('/api/contacts', ckeckAuth, require('./routes/Contact'));
app.use('/api/meetings', ckeckAuth, require('./routes/Meeting'));
app.use('/api/supportTicket',ckeckAuth,require('./routes/SupportTicket'));
app.use('/api/token',require('./routes/Session'));

module.exports = app;