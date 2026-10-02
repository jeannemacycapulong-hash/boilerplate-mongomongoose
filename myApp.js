require('dns').setServers(['8.8.8.8', '8.8.4.4']); 
  require('dotenv').config();
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); 
