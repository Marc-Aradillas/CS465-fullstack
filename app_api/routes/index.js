const express = require('express'); // Express app
const router = express.Router(); // Router Logic

// note to self on why this works:
// express-jwt v6 and earlier exported a function.
// express-jwt v7+ now exports an object { expressjwt }, and you have to destructure it.

const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256'] // added as required in docs
});

// This is where we import the controllers we will route
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// define route for our trips enpoint
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripLilst
    .post(auth, tripsController.tripsAddTrip); // protected POST Method; Adds a Trip

// GET Method routes tripsFindByCode - requires parameter 
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip); // protected PUT
    
module.exports = router;