const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, response mkust include HTML status code.
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
    try {
        const q = await Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(q);
    } catch (err) {
        console.log(err); // Log the error to understand the issue
        return res.status(400).json({ message: "Error adding trip", error: err });
    }
};

// PUT: /trips/:tripCode - Updates an existing trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {

    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);
  
    try {
      const q = await Model
        .findOneAndUpdate(
          { 'code': req.params.tripCode },
          {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
          },
          { new: true } // returns the modified document rather than the original
        )
        .exec();
  
      if (!q) { // Database returned no data
        return res
          .status(400)
          .json({ message: 'Trip not found or update failed' });
      } else { // Return the resulting updated trip
        return res
          .status(200)
          .json(q);
      }
    } catch (err) {
      // Catch any errors and return a 500 internal server error
      console.error(err);
      return res
        .status(500)
        .json({ message: 'Error updating trip', error: err });
    }
  
    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
  };

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};