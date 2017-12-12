const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const path = require('path');
const createExpressApp = require('./create-express-app');

require('dotenv').config();

MongoClient.connect(process.env.DB_CONN, (err, db) => {

  console.log('Connected to MongoDB...');

  createExpressApp(db)
    .listen(3000, () => {
      database = db;
      console.log('Listening on Port 3000...');
    });

});

