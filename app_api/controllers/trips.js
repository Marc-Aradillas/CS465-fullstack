const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

const User = mongoose.model('users');
// Get user function
const getUser = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    User
      .findOne({ email: req.payload.email })
      .exec((err, user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        } else if (err) {
          return res.status(400).json(err);
        }
        callback(req, res, user.name); // or user object, depending on what you need
      });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code.
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // The following line shows the result of the query on the console
        //console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
    
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response mkust include HTML status code.
// and JSON message to the requesting client

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code': req.params.tripCode}) // Return single record
        .exec();

        // The following line shows the result of the query on the console
        //console.log(q);
        
    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }
    
};

// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
  getUser(req, res,
    (req, res) => {
      Trip
        .create({
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        },
          (err, trip) => {
            if (err) {
              return res
                .status(400) // bad request
                .json(err);
            } else {
              return res
                .status(201) // created
                .json(trip);
            }
          });
    }
  );
}

// PUT: /trips/:tripCode - Updates an existing trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  getUser(req, res,
    (req, res) => {
      Trip
        .findOneAndUpdate({ 'code': req.params.tripCode }, {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        }, { new: true })
        .then(trip => {
          if (!trip) {
            return res
              .status(404)
              .send({
                message: "Trip not found with code" + req.params.tripCode
  });
          }
          res.send(trip);
        }).catch(err => {
          if (err.kind === 'ObjectId') {
            return res
              .status(404)
              .send({
                message: "Trip not found with code" + req.params.tripCode
  });
          }
          return res
            .status(500) // server error
            .json(err);
        });
    }
    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
  );
} 

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};