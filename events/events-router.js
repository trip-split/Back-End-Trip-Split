const router = require('express').Router();

const Events = require('./events-model');

const db = require('../data/dbConfig.js');


router.post('/usertrips/add-event', (req, res) => {
    let tripEvent = {};
    tripEvent.trips_id = req.body.event.trips_id;
    tripEvent.title = req.body.event.title;
    tripEvent.total_price = req.body.event.total_price;
    tripEvent.participants = req.body.event.participants;
    tripEvent.userOnTrip = req.body.event.userOnTrip;
    tripEvent.userPaid = req.body.event.userPaid;
    tripEvent.participantPaid =   req.body.event.participantPaid;

    console.log(tripEvent)
    Events
    .addEvent(tripEvent)
    .then(event => {
        res.status(200).json({message: 'Trip event successfully added', event})
        console.log(event);
    })
    .catch(err) {
        res.status(500).json({message: 'Error adding trip, make sure the req.body is correct', err})
        console.log(event);
    }
  });

  router.delete('/usertrips/delete-event/:id', (req, res) => {
    const {id} = req.params;
    Events.
    remove(id)
    .then(event => {
        if (event) {
            res.status(204).json({ message: 'Event successfully deleted from the trip' });
        } else {
            res.status(404).json({ success: false, message: "The event with the specified ID does not exist." });
        }
    })
        .catch(err => {
            res.status(500).json({ error: "The event could not be removed" })  
    })
  })

  router.put('/usertrips/edit-event/:id', (req, res) => {
    const { id } = req.params;
    let edits = {};
    edits.trips_id = req.body.trips_id;
    edits.date = req.body.date;
    edits.title = req.body.title;
    edits.total_price = req.body.total_price;
    edits.participants = req.body.participants;
    edits.userOnTrip = req.body.userOnTrip;
    edits.userPaid = req.body.userPaid;
    edits.participantPaid = req.body.participantPaid;
    console.log(edits)
  
    Events.update(id, edits)
    .then(eventUpdate => {
        if( !eventUpdate) {
            res.status(404).json({ success: false, message: 'The trip event with the specified ID does not exist.', edits })
        }  else if ( !edits ) {
            return res.status(400).json({  success: false, errorMessage: 'The event does not exist on this trip.' })
        }
         else {
            return res.status(200).json({ success: true, edits })
        }
    })
    .catch(err => {
        res.status(500).json({  success: false, error: 'The trip event could not be modified'})
    })
  })

router.get("/usertrips/events/:id", (req, res) => {
    const { id } = req.params;
    getEvents(id)
      .then(trip => {
        console.log(trip);
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

  router.get('/trip-events', (req, res) => {
    Events.find()
      .then(event => {
        res.json(event);
      })
      .catch(err => res.send(err));
  });

  function getEvents(id) {
    return db("events").where({ trips_id: id });
  }

module.exports = router;