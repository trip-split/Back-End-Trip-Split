const router = require('express').Router();

const TripParticipants = require('./trip-participants-model.js');

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

module.exports = router;