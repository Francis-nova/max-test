const express = require(express);
const express = require("express"); //its require "express"
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

/**
 * Assume that these are error free.
 */
const User = require('./models/user');
const logger = require('./utils/logger');

// const mongoDB = process.env.MONGO_URI;
const mongoDB = 'mongodb://127.0.0.1/maxng';

mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(bodyParser.json());

// handler to save user
// should be a post not get
app.post('/save', function(res, req) {
  
	let newUser = {
		"name": req.body.name,
		"email": req.body.email,
		"username": req.body.username,
		"password": req.body.password,
    };
    
    const user = new User(newUser);

  user.save(function(err) {
    if (err) {
      res.status(500).send(err);
      return logger.log(err);
    }
  });

  res.status(200).send('success');

  return res.json(user);
});

const server = http.createServer(app);

server.listen(80, function() {
  db.on('error', function(error) {
    logger.log(error);
  });
});