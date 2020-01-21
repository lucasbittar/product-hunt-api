const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// Init app
const app = express();
app.use(express.json());
app.use(cors());

// Connect DB
const databaseUri = 'mongodb://localhost:27017/nodeapi';
const connect = async () => {
  console.log(`Connecting to DB - uri: ${databaseUri}`);
  return mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
connect()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((e) => {
    console.log('Something went wrong: ', e.message);
  });

requireDir('./src/models');

// Routes
app.use('/api', require('./src/routes'));

app.listen(3001);
