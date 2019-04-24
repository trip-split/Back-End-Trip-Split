const router = require('express').Router();

const TripParticipants = require('./trip-participants-model.js');
const getTrips = require('../trips/trips-model');

router.post('/add-user',  (req, res) => {
  let tripParticipant = req.body
//   console.log(tripParticipant)
  TripParticipants
  .addParticipant(tripParticipant)
  .then(tripParticipant => {
      res.status(200).json({message: 'Trip successfully added', tripParticipant})
      console.log(tripParticipant);
  })
  .catch(err => {
      res.status(500).json({message: 'Error adding trip, make sure the req.body is correct', err})
      console.log(tripParticipant);
  })
})

router.get("/add-user/:id", (req, res) => {
    const { id } = req.params;
    getTrips(id)
      .then(tripParticipant => {
        // console.log(tripParticipant);
        if (tripParticipant) {
          return getTripParticipants(id).then(id => {
            trips.id = id;
            console.log(tripParticipant);
            return res.status(200).json({ tripParticipant });
          });
        } else {
          res.status(404).json({ error: "please provide project id" });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "Could not get trip participants items" });
      });
  });

module.exports = router;