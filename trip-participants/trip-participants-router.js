const router = require('express').Router();

const TripParticipants = require('./trip-participants-model.js');

const db = require('../data/dbConfig.js');


router.post('/usertrips/add-participant', async (req, res) => {
    let tripParticipant = {};
    tripParticipant.trips_id = req.body.trips_id;
    tripParticipant.name = req.body.name;
    tripParticipant.thumbnail = req.body.thumbnail;
    console.log(tripParticipant)
    try{
      TripParticipants
    .addParticipant(tripParticipant)
    .then(tripParticipant => {
        res.status(200).json({message: 'Trip Participant successfully added', tripParticipant})
        console.log(tripParticipant);
    })
    }
    
    catch(err) {
        res.status(500).json({message: 'Error adding trip, make sure the req.body is correct', err})
        console.log(tripParticipant);
    }
  });

  router.delete('/usertrips/delete-participant/:id', (req, res) => {
    const {id} = req.params;
    TripParticipants.
    remove(id)
    .then(participant => {
        if (participant) {
            res.status(204).json({ message: 'Participant successfully deleted from the trip' });
        } else {
            res.status(404).json({ success: false, message: "The participant with the specified ID does not exist." });
        }
    })
        .catch(err => {
            res.status(500).json({ error: "The participant could not be removed" })  
    })
  })

  router.put('/usertrips/edit-participant/:id', (req, res) => {
    const { id } = req.params;
    let edits = {};
    edits.trips_id = req.body.trips_id;
    edits.name = req.body.name;
    edits.thumbnail = req.body.thumbnail;
    console.log(edits)
  
    TripParticipants.update(id, edits)
    .then(participantUpdate => {
        if( !participantUpdate) {
            res.status(404).json({ success: false, message: 'The trip participant with the specified ID does not exist.' })
        }  else if ( !edits ) {
            return res.status(400).json({  success: false, errorMessage: 'The participant does not exist on this trip.' })
        }
         else {
            return res.status(200).json({ success: true, edits })
        }
    })
    .catch(err => {
        res.status(500).json({  success: false, error: 'The trip participant could not be modified'})
    })
  })

router.get("/usertrips/participants/:id", (req, res) => {
    const { id } = req.params;
    getParticipants(id)
      .then(trip => {
        if (trip) {
          return getParticipants(id).then(participant => {
            trip.participant = participant;
            return res.status(200).json({ trip });
          });
        } else {
          res.status(404).json({ error: "please provide trip id" });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "Could not get trip participants" });
      });
  });

  
router.get('/trip-participants', (req, res) => {
    TripParticipants.find()
      .then(trips => {
        res.json(trips);
      })
      .catch(err => res.send(err));
  });

  function getUsers(id) {
    return db("users")
      .where({ id })
      .first();
  }
  
  function getTrips(id) {
    return db("trips").where({ user_id: id });
  }

  function getParticipants(id) {
    return db("trip_participants").where({ trips_id: id });
  }

module.exports = router;