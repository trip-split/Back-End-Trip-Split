const router = require('express').Router();

const Trips = require('./trips-model.js');


router.get('/trips', (req, res) => {
  Trips.find()
    .then(trips => {
      res.json(trips);
    })
    .catch(err => res.send(err));
});

router.get('/usertrips/:user_id', (req, res) => {
  const {user_id} = req.params;
  console.log(req.params)
  Trips.findTripByUser(user_id)
    .then(trips => {
      res.json(trips);
    })
    .catch(err => res.send(err));
});


router.post('/trips',  (req, res) => {
  let tripTitle = req.body
  console.log(tripTitle.user_id)
  Trips
  .add(tripTitle)
  .then(trip => {
      res.status(200).json({message: 'Trip successfully added', trip});
  })
  .catch(err => {
      res.status(500).json({message: 'Error adding trip, make sure the req.body is correct'})
  })
})

// Delete Trips

router.delete('/trips/:id', (req, res) => {
  const {id} = req.params;
  Trips.
  remove(id)
  .then(trip => {
      if (trip) {
          res.status(204).json({ message: 'Trip successfully deleted' });
      } else {
          res.status(404).json({ success: false, message: "The trip with the specified ID does not exist." });
      }
  })
      .catch(err => {
          res.status(500).json({ error: "The trip could not be removed" })  
  })
})

// Edit Trips

router.put('/trips/:id', (req, res) => {
  const { id } = req.params;
  const edits = req.body;

  Trips.update(id, edits)
  .then(tripUpdate => {
      if( !tripUpdate) {
          res.status(404).json({ success: false, message: 'The trip with the specified ID does not exist.' })
      }  else if ( !edits ) {
          return res.status(400).json({  success: false, errorMessage: 'Please provide info for the trip.' })

      }
       else {
          return res.status(200).json({ success: true, edits })
      }
  })
  .catch(err => {
      res.status(500).json({  success: false, error: 'The trip information could not be modified'})
  })
})


module.exports = router;