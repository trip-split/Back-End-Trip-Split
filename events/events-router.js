const router = require('express').Router();

const Events = require('./events-model');

const db = require('../data/dbConfig.js');


router.post('/usertrips/add-event', async (req, res) => {
    let tripEvent = {};
    tripEvent.trips_id = req.body.event.trips_id;
    tripEvent.title = req.body.event.title;
    tripEvent.total_price = req.body.event.total_price;
    tripEvent.participants = req.body.event.participants;
    tripEvent.userOnTrip = req.body.event.userOnTrip;
    tripEvent.userPaid = req.body.event.userPaid;
    tripEvent.participantPaid =   req.body.event.participantPaid;

    console.log(tripEvent)
    try{
    Events
    .addEvent(tripEvent)
    .then(event => {
        res.status(200).json({message: 'Trip Participant successfully added', event})
        console.log(event);
    })
    }
    
    catch(err) {
        res.status(500).json({message: 'Error adding trip, make sure the req.body is correct', err})
        console.log(tripEvent);
    }
  });

//   router.delete('/usertrips/delete-participant/:id', (req, res) => {
//     const {id} = req.params;
//     TripParticipants.
//     remove(id)
//     .then(participant => {
//         if (participant) {
//             res.status(204).json({ message: 'Participant successfully deleted from the trip' });
//         } else {
//             res.status(404).json({ success: false, message: "The participant with the specified ID does not exist." });
//         }
//     })
//         .catch(err => {
//             res.status(500).json({ error: "The participant could not be removed" })  
//     })
//   })

//   router.put('/usertrips/edit-participant/:id', (req, res) => {
//     const { id } = req.params;
//     let edits = {};
//     edits.trips_id = req.body.trips_id;
//     edits.name = req.body.name;
//     edits.thumbnail = req.body.thumbnail;
//     console.log(edits)
  
//     TripParticipants.update(id, edits)
//     .then(participantUpdate => {
//         if( !participantUpdate) {
//             res.status(404).json({ success: false, message: 'The trip participant with the specified ID does not exist.' })
//         }  else if ( !edits ) {
//             return res.status(400).json({  success: false, errorMessage: 'The participant does not exist on this trip.' })
//         }
//          else {
//             return res.status(200).json({ success: true, edits })
//         }
//     })
//     .catch(err => {
//         res.status(500).json({  success: false, error: 'The trip participant could not be modified'})
//     })
//   })

router.get("/usertrips/events/:id", (req, res) => {
    const { id } = req.params;
    getEvents(id)
      .then(trip => {
        if (trip) {
          return getEvents(id).then(event => {
            trip.event = event;
            return res.status(200).json({ event });
          });
        } else {
          res.status(404).json({ error: "please provide event id" });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "Could not get event participants" });
      });
  });

  


//   function getUsers(id) {
//     return db("users")
//       .where({ id })
//       .first();
//   }
  
//   function getTrips(id) {
//     return db("trips").where({ user_id: id });
//   }

//   function getParticipants(id) {
//     return db("trip_participants").where({ trips_id: id });
//   }

  function getEvents(id) {
    return db("events").where({ trips_id: id });
  }

module.exports = router;