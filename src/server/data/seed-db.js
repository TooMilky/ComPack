// Refer to .env configuration file
require('dotenv').config(); 


const MongoClient = require('mongodb').MongoClient;
// Bcrypt hash password
const bcrypt = require('bcrypt');

// Retrieve from contracts.json and users.json
const users = require('./users');
// const forums = require('./forums');


function seedCollection(collectionName, initialRecords) {

  // Connect env.DB_CONN
  MongoClient.connect(process.env.DB_CONN, (err, db) => {
    console.log('Connected to MongoDB...');

    const collection = db.collection(collectionName);

    collection.remove();  

    initialRecords.forEach((item) => {
      if (item.password) {
        item.password = bcrypt.hashSync(item.password, 10);
      }
    });

    console.log('Inserting records...');

    collection.insertMany(initialRecords, (err, result) => {
      console.log(`${result.insertedCount} Records Inserted.`);
      console.log('Closing Connection...');
      db.close();
      console.log('Done.');

    });

  });
}


seedCollection('users', users);
// seedCollection('forums', forums);
