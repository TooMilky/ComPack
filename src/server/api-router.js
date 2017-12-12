const express = require('express');
const jwt = require('jsonwebtoken');
// Hash password
const bcrypt = require('bcrypt');
// Check JWT
const checkJwt = require('express-jwt');

var ObjectID = require('mongodb').ObjectID;


function apiRouter(database) {
  const router = express.Router();

  // Check for JWT SECRET unless it's at authenticate path
  router.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: ['/api/authenticate', '/api/register'] })
  );

  // Error, Request, Respond, Next Function
  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message });
    }
  });


  /////////////////////////////////STAFF_SECTION/////////////////////////////////

  // Get staffs method
  router.get('/staffs', (req, res) => {

    const staffsCollection = database.collection('staffs');

    staffsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  // Create staffs method
  router.post('/staffs', (req, res) => {
    const user = req.body;

    const staffsCollection = database.collection('staffs');

    staffsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });

    // Search for a specific staff method 
    router.get('/staffs/:id', function (req, res) {
      const staffsCollection = database.collection('staffs');
      staffsCollection.findOne(new ObjectID(req.params.id), function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    });
  
    // Edit staff method
    router.put("/staffs/:id", function (req, res) {
      var updateDoc = req.body;
      console.log(updateDoc);
      delete updateDoc._id;
  
      const staffsCollection = database.collection('staffs');
      staffsCollection.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to update staff");
        } else {
          res.status(204).end();
        }
      });
    });
  
    // Delete staff method
    router.delete("/staffs/:id", function (req, res) {
      const staffsCollection = database.collection('staffs');
      staffsCollection.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
        if (err) {
          handleError(res, err.message, "Failed to delete staff");
        } else {
          console.log("Deleted.")
          res.status(204).end();
        }
      });
    });

  /////////////////////////////////FORUM_SECTION/////////////////////////////////


  // Get forums method
  router.get('/forums', (req, res) => {

    const forumsCollection = database.collection('forums');

    forumsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  // Create forums method
  router.post('/forums', (req, res) => {
    const user = req.body;

    const forumsCollection = database.collection('forums');

    forumsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });


  // Search for a specific forum method 
  router.get('/forums/:id', function (req, res) {
    const forumsCollection = database.collection('forums');
    forumsCollection.findOne(new ObjectID(req.params.id), function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  // Edit forum method
  router.put("/forums/:id", function (req, res) {
    var updateDoc = req.body;
    console.log(updateDoc);
    delete updateDoc._id;

    const forumsCollection = database.collection('forums');
    forumsCollection.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update forum");
      } else {
        res.status(204).end();
      }
    });
  });

  // Delete forum method
  router.delete("/forums/:id", function (req, res) {
    const forumsCollection = database.collection('forums');
    forumsCollection.deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete forum");
      } else {
        console.log("Deleted.")
        res.status(204).end();
      }
    });
  });


  /////////////////////////////////USERS_SECTION/////////////////////////////////


  // Get Users Method from database and retrieve from users collection
  router.get('/users', (req, res) => {

    const forumsCollection = database.collection('users');

    // find{} is empty allowing to return the whole collection
    forumsCollection.find({}).toArray((err, docs) => {

      return res.json(docs)
    });

  });

  //search for a specific user.    
  router.get('/users/:id', function (req, res) {
    const usersCollection = database.collection('users');
    usersCollection.findOne(new ObjectID(req.params.id), function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  // Create a new user
  router.post('/register', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    usersCollection
      .findOne({ username: user.username }, (err, result) => {

        if (result) {
          return res.status(302).json({ error: 'This username is already exists' })
        }

        if (!result) {
          user.password = bcrypt.hashSync(user.password, 10);
          usersCollection.insertOne(user, (err, r) => {

            if (err) {
              return res.status(500).json({ error: 'Error inserting new record.' })
            }

            const newRecord = r.ops[0];

            return res.status(201).json(newRecord);
          });
        }
      });
  });

  // Create Authenticate Method
  router.post('/authenticate', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    // Search for user
    usersCollection
      .findOne({ username: user.username }, (err, result) => {
        if (!result) {
          return res.status(404).json({ error: 'User not found' })
        }

        if (!bcrypt.compareSync(user.password, result.password)) {
          return res.status(401).json({ error: 'Incorrect Password' });
        }

        const payload = {
          username: result.username,
          admin: result.admin
        };

        //https://www.grc.com/passwords.htm
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });

        return res.json({
          message: 'Successfully Authenticated',
          token: token,
          _id: result._id,
          admin: result.admin
        });
      });
  });

  return router;
}

module.exports = apiRouter;

